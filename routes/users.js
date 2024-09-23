const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/adduser", async (req, res) => {
  const { firstName, lastName, age } = req.body;
  try {
    const newUser = new User({
      firstName,
      lastName,
      age,
    });
    const user = await newUser.save();
    res.send(user.firstName);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(401).send("user is not exists");
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/updateuser/:id", async (req, res) => {
  const { firstName, lastName, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, age },
      { new: true }
    );
    console.log(updatedUser);
    res.send(updatedUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(401).send("user not found");
    }
    res.send("User deleted successfully");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
