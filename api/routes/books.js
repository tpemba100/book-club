const router = require("express").Router();
const Book = require("../models/Book");

//  POST --> CREATE new book
router.post("/", async (req, res) => {
  const newBook = new Book(req.body);
  console.log("running");

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
    console.log("success POST");
  } catch (err) {
    res.status(500).json(err);
    console.log("POST FAIL");
  }
});

// GET ALL books

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books.reverse()); //send us the latest movie added first
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
