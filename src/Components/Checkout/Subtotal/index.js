import React from "react";
import "./subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../../Redux/StateProvider";
import { getBasketTotal } from "../../../Redux/reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  let history = useHistory();
  const [{ basket }, diaptch] = useStateValue();

  return (
    <div className="subtotal">
      <button onClick={(e) => history.push("/payment")}>
        Proceed to checkout
      </button>

      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):<strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Subtotal;
