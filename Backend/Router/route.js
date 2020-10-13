import express from "express";
import userModel from "../DBmodels/userModel.js";

const app = express.Router();

app.get("/", (req, res) => res.status(200).send("Hey"));

//   User Routes

app.post("/adduser", (req, res) => {
  const body = req.body;

  userModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/adduser/sync", (req, res) => {
  userModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// STRIPE PAYMENT FUNCTIONALITY

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default app;
