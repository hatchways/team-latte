const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //Note 'token' is defined up there

    const user = await User.findOne({
      _id: decoded._id
    });

    if (!user) {
      throw new Error("Not logged in");
    }

    //create token for found user, then compare and make sure they are the same. if not, return wrong user 4** error

    req.token = token;
    req.user = user;
    //console.log('-------token is '+ token)
    next();
  } catch (e) {
    res.status(401).send({ error: e });
  }
};

module.exports = auth;
