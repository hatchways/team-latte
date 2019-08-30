const express = require("express");
const router = new express.Router();
const AWS = require("aws-sdk");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");

//set up image upload paramaters
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be an image (jpg,jpeg,png)."));
    }

    cb(undefined, true);
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const user = new User({
      ...req.body
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    if (e.errors) {
      const errors = Object.keys(e.errors).map(
        error => e.errors[error].message
      );
      res.status(400).send({ status: 400, message: errors[0] });
    } else if (e.errmsg.includes("duplicate"))
      res
        .status(400)
        .send({
          status: 400,
          message: "Account already exists using that email."
        });
    else
      res
        .status(400)
        .send({
          status: 400,
          message: "There was an error creating the account."
        });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(res)
    const user = await User.checkCredentials(req.body.email, req.body.password); //Checking credentials with provided email and password (located in req.body)
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token});
  } catch (err) {
    console.log(err.message);
    res.status(401).send({ status: 401, message: err.message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/user/:id", auth, upload.single("profile"), async (req, res) => {
  const s3 = new AWS.S3();

  //create a new user object based off the original
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("User not found.");
  }

  //get any updated user info
  const {
    email,
    name,
    password,
    location,
    expertise,
    description,
    linkedIn,
    angelList
  } = req.body;

  //update user info on new user object
  if (email) user.email = email;
  if (name) user.name = name;
  if (password) user.password = password;
  if (location) user.location = location;
  if (expertise) user.expertise = expertise;
  if (description) user.description = description;
  if (linkedIn) user.linkedIn = linkedIn;
  if (angelList) user.angelList = angelList;

  //remove from s3 if profile pic exists
  if (user.profilePic.key && req.file.originalname) {
    const params = {
      Bucket: process.env.aws_bucket,
      Key: user.profilePic.key
    };
    s3.deleteObject(params, (err, data) => {
      if (err) res.status(503).send(err);
    });
  }
  //add profile pic to s3 then update user and send
  if (req.file.originalname) {
    const params = {
      Bucket: process.env.aws_bucket,
      Key: user.email.replace(/[^a-zA-Z0-9]/g, "") + req.file.originalname,
      Body: req.file.buffer,
      ACL: "public-read"
    };
    s3.upload(params, (err, data) => {
      if (err) res.status(503).send(err);
      else {
        user.profilePic.link = data.Location;
        user.profilePic.key = data.Key;
        user.save();
        res.status(200).send(user);
      }
    });
  }
  //update and send if no profile pic
  else {
    try {
      await user.save();
      res.status(200).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
