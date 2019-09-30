const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error("password length too short");
      }
    }
  }
});

userSchema.virtual("Projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "author"
});

userSchema.virtual("Profiles", {
  ref: "Profile",
  localField: "_id",
  foreignField: "_id"
});

userSchema.virtual("Investments", {
  ref: "Investment",
  localField: "_id",
  foreignField: "investorID"
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this.id.toString() }, process.env.JWT_SECRET);

  return token;
};

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

userSchema.statics.checkCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Login credentials are incorrect.");
  }
  const pCompare = await bcrypt.compare(password, user.password);
  if (pCompare) {
    return user;
  } else {
    throw new Error("Login credentials are incorrect.");
  }
};

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
