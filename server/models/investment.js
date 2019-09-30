const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const investmentSchema = new Schema({
  investorID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: {
    type: Number,
    required: true
  },
  projectID: { type: Schema.Types.ObjectId, ref: "Project", required: true }
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
