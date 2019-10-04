const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const Profile = require("../models/profile");

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      ...req.body
    });
    const profile = new Profile({
      name: req.body.name,
      _id: user._id
    });
    await user.save();
    await profile.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    if (e.errors) {
      const errors = Object.keys(e.errors).map(
        error => e.errors[error].message
      );
      res.statusMessage = errors[0].message;
      res.status(400).send();
    } else if (e.errmsg.includes("duplicate")) {
      res.statusMessage = "Account already exists using that email.";
      res.status(403).send();
    } else {
      res.statusMessage = "There was an error creating the account.";
      res.status(403).send();
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.checkCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.statusMessage = err.message;
    res.status(401).send();
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.statusMessage = "Server Error";
    res.status(500).send(e);
  }
});

router.put("/user/:id", auth, async (req, res) => {
  //create a new user object based off the original
  const user = await User.findById(req.params.id);
  if (!user) {
    res.statusMessage = "User not found.";
    return res.status(404).send("User not found.");
  }
  if (!(req.user._id.toString() === user._id.toString())) {
    return res.status(403).send("Wrong user.");
  }

  //get any updated user info
  const { email, name, password } = req.body;

  //update user info on new user object
  if (email) user.email = email;
  if (name) user.name = name;
  if (password) user.password = password;
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.statusMessage = "User not found.";
    res.status(404).send(e);
  }
});

module.exports = router;
