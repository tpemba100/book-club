const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    friends: { type: String },
    bookList: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", ListSchema);
