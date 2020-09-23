import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebaseconfig";
import { useStateValue } from "../../Redux/StateProvider";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    //login logic
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };

  // const Register = (event) => {
  //   event.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)

  //     .then((auth) => {
  //       //user created and redirect to homepage
  //       history.push("/");
  //     })
  //     .catch((e) => alert(e.message));
  // };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login_container">
        <h1>Login</h1>
        <form>
          <label for="email">
            <h5>E-mail</h5>
          </label>
          <br />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            placeholder="Please enter your email here"
            type="email"
          />
          <br />
          <label for="password">
            <h5>Password</h5>
          </label>
          <br />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            placeholder="Enter your password here"
            type="password"
          />
          <button onClick={login} type="submit" className="login_SigninButton">
            Sign In
          </button>
        </form>
        <p>
          By signing - in you agree the terms of our website. Check out our
          cookies, privacy notice prior to sign-in
        </p>
      </div>
      <br />
      <div className="login_divider">
        <div class="inside">
          <span>
            <h5>New to Amazon?</h5>
          </span>
        </div>

        <button
          onClick={(e) => history.push("/createuser")}
          className="login_RegisterButton"
        >
          Create your Account
        </button>
      </div>
    </div>
  );
}

export default Login;
