import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import axios from "axios";
import Pusher from "pusher";
import dbModel from "./DBmodels/index.js";

// app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1077788",
  key: "77134266896edffa12a6",
  secret: "84066de360f835564bff",
  cluster: "ap2",
  encrypted: true,
});

// middlewarse
app.use(express.json());
app.use(cors);

//DB config

const connection_url =
  "mongodb+srv://harpreet:Password123@cluster0.sq4xa.mongodb.net/amazon_clone?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
mongoose.connection.once("open", () => {
  console.log("MONGODB CONNECTED");

  const itemCollection = db.collection("items");
  const changeStream = itemCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const itemDetails = change.fullDocument;
      pusher.trigger("items", "inserted", {
        title: itemDetails.title,
        price: itemDetails.price,
        ratings: itemDetails.ratings,
        image: itemDetails.image,
        category: itemDetails.category,
        id: itemDetails.id,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("Hey"));
app.post("/additems", (req, res) => {
  const body = req.body;

  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/additems/sync", (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => console.log(`Running on >>>>>>> ${port}`));
