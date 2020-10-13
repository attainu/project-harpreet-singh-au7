import express from "express";
import User from "../DBmodels/userModel.js";

import sendEmail from "../Controllers/mail.js";

var router = express();

//mailsending api
router.post("/sendMail", (req, res) => {
  console.log(req.body);
  sendEmail(req.body.email, req.body.name, "verify-email");
});

router.get("/confirmation/:token", async (req, res) => {
  console.log("req received");
  try {
    jwt.verify(req.params.token, process.env.JWT_SECRET).then(() => {
      res.status(200).send("Email verified");
      console.log("Email =>>> verified");
    });
  } catch (err) {
    console.log(error);
  }
});

export default router;
