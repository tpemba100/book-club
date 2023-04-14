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

// GET ALL users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users.reverse()); //send us the latest movie added first
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
