import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Pusher from "pusher";
import route from "./Router/route.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Stripe from "stripe";
import cookieParser from "cookie-parser";
import Verify_email from "./Router/verifyEmail.js";
import productRoutes from "./Router/productRoutes.js";

dotenv.config();
// app config
const app = express();
const port = process.env.PORT || 8080;
const stripe = new Stripe(process.env.STRIPE_SECRET);

const pusher = new Pusher({
  appId: "1077788",
  key: "77134266896edffa12a6",
  secret: "84066de360f835564bff",
  cluster: "ap2",
  encrypted: true,
});

// middlewarse
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//DB config

export const connection_url = process.env.MONGO_URI;

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

app.use("/", route);
app.use("/api/", Verify_email);
app.use("/products", productRoutes);

//Listener
app.listen(port, () => console.log(`Running on >>>>>>> ${port}`));
