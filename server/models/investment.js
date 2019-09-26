const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  investorID: {
    type: { type: Schema.Types.ObjectId, ref: "User" },
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  projectID: {
    type: { type: Schema.Types.ObjectId, ref: "Project" },
    required: true
  }
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
