const router = require("express").Router();
const User = require("../models/User");

//  POST --> register new user
//      currently only username
router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  console.log("creating new user");

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("User Created");
  } catch (err) {
    res.status(500).json(err);
    console.log("User creation FAIL");
  }
});

// POST --> login and get data
// Find user based on username --> response (user data)
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Wrong Password or Username" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one USER Data  --> doUpdate
router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("we found you");
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET ALL users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users.reverse()); //send us the latest movie added first
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT --> update user's booklist
// initialize user's ID# & book's ID --> req.params._id & .bookList
//using mongoDb function [findByIdAndUpdate] find the user & updat the bookList
router.put("/:_id/bookList/:bookId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params._id,
      { $push: { bookList: req.params.bookId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
    console.log("error put");
  }
});

module.exports = router;
