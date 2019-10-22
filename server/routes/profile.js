const express = require("express");
const router = new express.Router();
const AWS = require("aws-sdk");
const auth = require("../middleware/auth");
const multer = require("multer");
const Profile = require("../models/profile");
const Project = require("../models/project");

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

router.get("/profile/:id", async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("Not a valid id");
    }
    const profile = await Profile.findById(req.params.id);
    const projects = await Project.find({ author: req.params.id });
    if (!profile) {
      throw Error("No Profile");
    }
    res.status(200).send({ profile, projects });
  } catch (e) {
    res.statusMessage = e;
    res.status(404).send(e);
  }
});

router.put("/apiprofile", auth, upload.single("profile"), async (req, res) => {
  if (!req.user._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
    res.statusMessage = "Not a valid ID";
    res.status(404).send("Not a valid Id");
  }
  const s3 = new AWS.S3();

  //create a new profile object based off the original
  const profile = await Profile.findById(req.user._id);
  if (!profile) {
    res.statusMessage = "Profile not found.";
    return res.status(404).send("Profile not found.");
  }

  const {
    name,
    location,
    expertise,
    description,
    avgCheque,
    linkedIn,
    angelList
  } = req.body;

  //update user info on new user object
  if (name) profile.name = name;
  if (location) profile.location = location;
  if (expertise) profile.expertise = expertise;
  if (description) profile.description = description;
  if (avgCheque) profile.avgCheque = avgCheque;
  if (linkedIn) profile.linkedIn = linkedIn;
  if (angelList) profile.angelList = angelList;

  //remove from s3 if profile pic exists
  if (profile.profilePic.length > 0 && req.file) {
    const params = {
      Bucket: process.env.aws_bucket,
      Key: profile.profilePic.key
    };
    s3.deleteObject(params, (err, data) => {
      res.statusMessage = err;
      if (err) {
        res.statusMessage = "Server Error.";
        res.status(503).send(err);
      }
    });
  }
  //add profile pic to s3 then update user and send
  if (req.file) {
    const params = {
      Bucket: process.env.aws_bucket,
      Key:
        profile._id.toString().replace(/[^a-zA-Z0-9]/g, "") +
        req.file.originalname,
      Body: req.file.buffer,
      ACL: "public-read"
    };
    s3.upload(params, (err, data) => {
      if (err) {
        res.statusMessage = "Server Error.";
        res.status(503).send(err);
      } else {
        profile.profilePic.link = data.Location;
        profile.profilePic.key = data.Key;
        profile.save();
        res.status(200).send(profile);
      }
    });
  }
  //update and send if no profile pic
  else {
    try {
      await profile.save();
      res.status(200).send(profile);
    } catch (e) {
      res.statusMessage = e.message;
      res.status(400).send(e);
    }
  }
});

module.exports = router;
