const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  profilePic: {
    key: {
      type: String
    },
    link: {
      type: String
    }
  },
  location: {
    type: String
  },
  expertise: [
    {
      type: String
    }
  ],
  description: {
    type: String
  },
  avgCheque: {
    type: Number
  },
  linkedIn: {
    type: String
  },
  angelList: {
    type: String
  },
  investments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Investment"
    }
  ]
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
