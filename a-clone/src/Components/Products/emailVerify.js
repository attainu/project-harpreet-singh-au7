import React from "react";
import { Link, useHistory } from "react-router-dom";
import Recaptcha from "react-gcaptcha";
import "./verify.css";
import { useStateValue } from "../../Redux/StateProvider";
import axios from "../../axios";

let captcha;
var callback = function (key) {
  console.log(key);
};

var loaded = function () {
  console.log("recaptchaLoaded");
};
function EmailVerify() {
  const [{ user }] = useStateValue();
  const history = useHistory();

  let data = {
    email: user?.email,
    name: user?.displayName,
  };

  const submitHandeler = (e) => {
    e.preventDefault();

    async function sendEmail() {
      const res = await axios
        .post("/api/sendMail", data)
        .then((res) => {
          alert("email sent");
          console.log(res.body);
        })
        .catch((error) => {
          alert(`An error occured ${error}`);
        });
    }
    sendEmail();
  };

  return (
    <div className="emailVerify">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="verify_container">
        <h3>Please verify your email before adding product</h3>
        <Recaptcha
          sitekey="6LdTrNMZAAAAAL-ibkBGWQuzhXHA3Ljq-eK5nsH1"
          onloadCallback={loaded}
          verifyCallback={callback}
          ref={(el) => {
            captcha = el;
          }}
        />
        <button onClick={submitHandeler} className="verifyemail_button">
          Send Email
        </button>
        <p>
          By signing - in you agree the terms of our website. Check out our
          cookies, privacy notice prior to sign-up
        </p>
      </div>
    </div>
  );
}

export default EmailVerify;
