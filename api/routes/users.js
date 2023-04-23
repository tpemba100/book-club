const router = require("express").Router();
const User = require("../models/User");

//  POST --> register new user
//      currently only username
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  console.log(" user running");

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("success user POST");
  } catch (err) {
    res.status(500).json(err);
    console.log("POST user FAIL");
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

// GET one USER
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
// Find the username and update the user bookList
router.put("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookList = req.body.bookList; // update the bookList with the new data

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
