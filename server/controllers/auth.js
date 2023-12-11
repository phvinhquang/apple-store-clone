require("dotenv").config();

const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    // Kiểm tra lỗi validation
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    // Trích xuất data trong body
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const role = req.body.role || "customer";

    // Băm password và tạo user mới
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      phone: phone,
      role: role,
      cart: { items: [], totalAmount: 0 },
    });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error(
        "Thông tin đăng nhập không chính xác. Vui lòng thử lại"
      );
      error.statusCode = 401;
      throw error;
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      const error = new Error(
        "Thông tin đăng nhập không chính xác. Vui lòng thử lại"
      );
      error.statusCode = 401;
      throw error;
    } else if (correctPassword) {
      // TẠO TOKEN
      const token = jwt.sign(
        { userId: user._id.toString(), role: user.role },
        process.env.ACCESS_TOKEN,
        { expiresIn: "2d" }
      );

      // Đưa 1 số thông tin của user xuống client
      const userData = {
        email: user.email,
        fullname: user.fullname,
        phone: user.phone,
      };

      res.status(200).json({ token: token, userData: userData });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const userData = {
      email: user.email,
      fullname: user.fullname,
      phone: user.phone,
    };

    res.status(200).json({ message: "Done", user: userData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLogout = (req, res, next) => {
  res.status(201).json("Logged Out !!!");
};
