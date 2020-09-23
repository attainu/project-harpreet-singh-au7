import React, { useState } from "react";
import "./Createuser.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebaseconfig";

function Createuser() {
  const [name, setName] = useState("");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (event) => {
    event.preventDefault();
    //login logic
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };

  console.log(name);
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
        <h1>Register yourself by sign up</h1>
        <form>
          <label for="name">
            <h5>Name</h5>
          </label>
          <br />
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            placeholder="Enter you name here"
            type="text"
          />
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
          <button onClick={signup} type="submit" className="login_SigninButton">
            Create your Account
          </button>
        </form>
        <p>
          By signing - up you agree the terms of our website. Check out our
          cookies, privacy notice prior to sign-in
        </p>
      </div>
    </div>
  );
}

export default Createuser;
