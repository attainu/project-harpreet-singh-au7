import React from "react";
import { useStateValue } from "../../Redux/StateProvider";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket, user }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonDevices/2019/Herotator/MSO/desktop/CC_Echo-dot_1x._SY304_CB445355234_.jpg"
          alt=""
        />
        {basket?.length === 0 ? (
          <div>
            <h2>
              Your Cart is Empty. Please add some items to continue Shopping.
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="checkout_title"> Your Shopping cart</h2>
            {basket?.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={Math.random * 877}
              />
            ))}
          </div>
        )}
      </div>
      {basket?.length > 0 && (
        <div className="checkout_right">
          <h1>Subtotal</h1>
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
