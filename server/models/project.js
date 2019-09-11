const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    industry: {
      type: String,
      enum: ["Automotive", "Technology", "Culinary", "Literature", "Crafts"],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    photos: [
      {
        photo: {
          key: {
            type: String,
            required: true
          },
          link: {
            type: String,
            required: true
          }
        }
      }
    ],
    launch: {
      type: Boolean,
      required: true
    },
    funding_goal: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
