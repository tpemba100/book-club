const router = require("express").Router();
const User = require("../models/User");

//  CREATE user
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

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // After first err message, after i type correct txt. Back end Crashes.
    // !user && res.status(401).json({ message: "Wrong Password or Username" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
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
