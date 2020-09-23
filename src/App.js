import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
const promise = loadStripe(
  "pk_test_51HSgolI8TPVWBDuR0ru9kA5oCDNlrjFpFTNPn4Girz75phnCRhBAfrT4LyPAAMs9Ibc6UJZnvrYoptn4wFGRtWpK00iivhbPVj"
);

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [items, setItems] = useState("");

  useEffect(() => {
    axios.get("/additems/sync").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("77134266896edffa12a6", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("items");
    channel.bind("inserted", (data) => {
      alert(JSON.stringify(data));
    });
  }, []);

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
    console.log("USER IS>>", user);

    return () => {
      //cleanup once logout
      unsubscribe();
    };
  }, []);

  console.log(items);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/createuser">
            <Createuser />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
