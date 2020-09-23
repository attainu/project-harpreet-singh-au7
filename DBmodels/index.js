import mongoose from "mongoose";

const instance = mongoose.Schema({
  title: String,
  price: Number,
  ratings: Number,
  category: String,
  id: Number,
  image: String,
});

export default mongoose.model("items", instance);
