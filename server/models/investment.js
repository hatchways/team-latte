const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  investorID: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  projectID: {
    type: String,
    required: true
  }
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
