const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require("moment");

const projectSchema = new Schema(
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
    description: {
      type: String,
      required: true,
      maxlength: 500
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
    deadline: {
      type: Date,
      required: true,
      //default: moment(),
    },
    funding_goal: {
      type: Number,
      required: true,
      default: 0
    },

    raised_amount: {
      type: Number,
      required: true,
      default: 0
    },
    investments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Investment"
      }
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    authorName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

projectSchema.methods.toJSON = function () {
  const projectObject = this.toObject();
  moment(projectObject.deadline)

  return projectObject
}

projectSchema.virtual("Investments", {
  ref: "Investment",
  localField: "_id",
  foreignField: "projectID"
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
