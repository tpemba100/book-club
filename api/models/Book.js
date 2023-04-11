const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    isbn: { type: Number },
    numPage: { type: Number },
    img: { type: String },
    bookState: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", ListSchema);
