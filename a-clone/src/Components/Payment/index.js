import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../../Redux/StateProvider";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../Redux/reducer";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { db } from "../../firebase/firebaseconfig";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  var [clientSecret, setClientSecret] = useState(true);
  const [value, setValue] = React.useState("female");

  const handleChan = (event) => {
    setValue(event.target.value);
    {
      event.target.value == "COD"
        ? setDisabled(event.empty)
        : setError(event.error ? event.error.message : "");
    }
  };

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);
  console.log("👱", user);
  clientSecret = clientSecret.toString();

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const COD = document.getElementById("COD");
    let date = new Date("2011-10-10T14:48:00").toISOString();

    if (COD) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(clientSecret)
        .set({
          basket: basket,
          amount: getBasketTotal(basket),
          created: date,
        });
      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET",
      });

      history.replace("/orders");
    }

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details

    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            <form className="Payment_method" onSubmit={handleSubmit}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Select Any:"
                  name="select"
                  value={value}
                  onChange={handleChan}
                >
                  <FormControlLabel
                    id="COD"
                    value="COD"
                    control={<Radio />}
                    label="COD"
                  />
                  <FormControlLabel
                    id="Card_payment"
                    value="Card Payment"
                    control={<Radio />}
                    label="Card Payment"
                  />
                  {value == "Card Payment" ? (
                    <CardElement id="card_p" onChange={handleChange} />
                  ) : (
                    ""
                  )}
                </RadioGroup>
              </FormControl>

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {getBasketTotal(basket) == 0 ? (
                  <h3 style={{ color: "red" }}>
                    ERROR:(EMPTY CART ) Please add some item to the cart and
                    return
                  </h3>
                ) : (
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                )}
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
