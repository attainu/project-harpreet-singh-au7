import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import { useStateValue } from "./Redux/StateProvider";
import { auth } from "./firebase/firebaseconfig";
import Createuser from "./Components/Login/Createuser";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Orders";
import Pusher from "pusher-js";
import axios from "./axios";
import AddItems from "./Components/Products/addItems";
import EmailVerify from "./Components/Products/emailVerify";
// import { loadReCaptcha } from "react-recaptcha-google";
import Chat from "./Components/Chats";

const promise = loadStripe(
  "pk_test_51HSgolI8TPVWBDuR0ru9kA5oCDNlrjFpFTNPn4Girz75phnCRhBAfrT4LyPAAMs9Ibc6UJZnvrYoptn4wFGRtWpK00iivhbPVj"
);

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("products/additems/sync");

      setItems(req.data);
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   loadReCaptcha();
  // });

  useEffect(() => {
    var pusher = new Pusher("77134266896edffa12a6", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("items");
    channel.bind("inserted", (newItems) => {
      alert(JSON.stringify(newItems));
      setItems([...items, newItems]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [items]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // console.log("USER IS>>", user);

    return () => {
      //cleanup once logout
      unsubscribe();
    };
  }, []);

  return (
    // NOn -protected routes

    <Router>
      <div className="App">
        <>
          <Switch>
            <Route path="/createuser">
              <Createuser />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/verifyemail">
              <EmailVerify />
            </Route>
          </Switch>
        </>
        <>
          <div className="header_present">
            <Chat />
            <Switch>
              <Route exact path="/">
                <Header items={items} />
                <Home items={items} />
              </Route>

              <Route path="/checkout">
                <Header items={items} />
                <Checkout />
              </Route>

              <Route path="/orders">
                <Header items={items} />
                <Orders />
              </Route>

              <Route path="/additems">
                <Header items={items} />
                <AddItems />
              </Route>

              <Route path="/payment">
                <Elements stripe={promise}>
                  <Header items={items} />
                  <Payment />
                </Elements>
              </Route>
            </Switch>
          </div>
        </>
      </div>
    </Router>
  );
}

export default App;
