const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/profile");
const Investment = require("../models/investment");
const Project = require("../models/project");
const mongoose = require("mongoose");

router.post("/invest", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.user._id);
    const project = await Project.findById(req.body.projectID);
    if (!profile) {
      throw new Error({ status: 404, message: "User not found" });
    } else if (!project) {
      throw new Error({ status: 404, message: "Project not found" });
    }

    const investment = new Investment({
      investorID: profile._id,
      projectID: project._id,
      amount: parseFloat(req.body.amount)
    });
    await investment.save();
    project.raised_amount = project.raised_amount + parseFloat(req.body.amount);

    project.investments = project.investments.concat([investment._id]);
    profile.investments = profile.investments.concat([investment._id]);

    await project.save();
    await profile.save();
    res.status(200).send(investment);
  } catch (e) {
    if (e.status) {
      res.statusMessage = e.message;
      res.status(e.status).send(e.message);
    } else {
      res.statusMessage = "Server Error";
      res.status(503).send(e);
    }
  }
});

//get investments made to a project
router.get("/projectInvestments/:projectID", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectID).populate(
      "investments"
    );
    if (!project) {
      throw new Error({ status: 404, message: "Project not found!" });
    }
    res.status(200).send(project.investments);
  } catch (e) {
    if (e.status) {
      res.statusMessage = e.message;
      res.status(e.status).send(e.message);
    } else {
      res.statusMessage = "Server Error";
      res.status(503).send(e);
    }
  }
});

//get investments made by a user
router.get("/userInvestments/:userID", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.userID).populate(
      "investments",
      "projectID amount"
    );
    const projectIDs = profile.investments.map(
      investment => investment.projectID
    );
    const projects = await Project.find()
      .where("_id")
      .in(projectIDs);

    if (!profile) {
      throw new Error({ status: 404, message: "Profile not found!" });
    }
    res.status(200).send({ investments: profile.investments, projects });
  } catch (e) {
    if (e.status) {
      res.statusMessage = e.message;
      res.status(e.status).send(e);
    } else {
      res.statusMessage = "Server Error";
      res.status(503).send(e);
    }
  }
});

module.exports = router;
