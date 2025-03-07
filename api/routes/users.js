const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//  POST "REGISTER"
//        --> register new user
//        --> encrypt the password with the secrect_key & to String
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  console.log("creating new user");
  console.log(newUser);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("User Created");
  } catch (err) {
    res.status(500).json(err);
    console.log("User creation FAIL");
  }
});

// POST "LOGIN"
//        --> login and get data
// Find user based on username --> response (user data)
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Wrong Password or Username" });
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // if the password doesnt matches then err message
    if (originalPassword !== req.body.password) {
      // if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Wrong Password or Username" });
    }

    // just send all info expect the password
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Errors" });
  }
});

// GET :one USER Data  --> doUpdate, REFETCH RECENT CHANGES
// OR to share userData to public, read Only
// GET :one USER Data  --> doUpdate, REFETCH RECENT CHANGES
// OR to share userData to public, read Only
router.get("/:_id", async (req, res) => {
  class ShareUserDTO {
    constructor(user) {
      this._id = user.id;
      this.username = user.username;
      this.bookList = user.bookList;
      this.currentBook = user.currentBook;
      this.notes = user.notes;
      // Add other properties you want to send
    }
  }
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
    // Check if the request includes authentication credentials
    if (req.query.password) {
      // Use cryptoJS to decrypt and match the password
      const decryptedPassword = cryptoJS.AES.decrypt(
        req.query.password,
        process.env.SECRET_KEY
      ).toString(cryptoJS.enc.Utf8);
      if (decryptedPassword === user.password) {
        console.log("I AM RUNNING: ALL DATA");
        // If the password matches, send all user data including password
        return res.json(user);
      } else {
        // If the password does not match, send an error message
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // If no authentication credentials are provided, send a limited version of the user data
      const shareUserDTO = new ShareUserDTO(user);
      console.log("I AM RUNNING: User DTO LIMITED DATA");
      console.log(req.headers);
      return res.json(shareUserDTO);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET ALL users
//router.get("/", async (req, res) => {
//try {
//const users = await User.find();
//res.status(200).json(users.reverse()); //send us the latest movie added first
//} catch (err) {
//res.status(500).json(err);
//}
//});
router.get("/", async (req, res) => {
  try {
    // if the password doesnt matches then err message
    if ("lama" !== req.body.password) {
      // if (user.password !== req.body.password) {
      return res.status(401).json({ message: "You dont have access to this" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error or access denied." });
  }
});

//PUT --> "update user's booklist"
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

//PUT --> "UPDATE USER with new currentBook Id"
// initialize user's ID# & book's ID --> req.params._id
//using mongoDb function [findByIdAndUpdate] find the user & updat the current
router.put("/:_id/currentBook/:bookId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params._id,
      { $set: { currentBook: req.params.bookId } },
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

// DELETE --> "deletebook by ID"
router.delete("/:_id/bookList/:bookId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params._id,
      { $pull: { bookList: req.params.bookId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
    console.log("error delete");
  }
});

// PUT --> "add notes to user"
router.put("/:_id/notes", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params._id,
      {
        $push: {
          notes: {
            bookId: req.body.bookId,
            text: req.body.text,
          },
        },
      },
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

//DELETE --> "delete a specific note "
router.delete("/:userId/notes/:noteId", async (req, res) => {
  // sending data as parameters rather than body
  const { userId, noteId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { notes: { _id: noteId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
    // console.log(user);
  } catch (err) {
    res.status(500).json(err);
    console.log("error deleting note");
  }
});

module.exports = router;
