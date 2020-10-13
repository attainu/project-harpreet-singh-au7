import mongoose from "mongoose";

const User = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    dropDups: true,
  },
  Isemailconfirmed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("users", User);
