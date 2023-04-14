const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: { type: String },
    bookList: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", ListSchema);
