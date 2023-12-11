require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let decodedToken;
  try {
    const authHeaders = req.get("Authorization");
    if (!authHeaders) {
      const err = new Error("Not authorized");
      err.statusCode = 401;
      throw err;
    }

    const token = authHeaders.split(" ")[1];
    if (!token) {
      const err = new Error("Not authorized");
      err.statusCode = 401;
      throw err;
    }

    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    // Nếu verify fail
    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(decodedToken.userId);
    if (user.role !== "admin") {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 555;
      next(err);
    }
  }
};
