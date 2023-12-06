const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

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
      req.session.isLoggedIn = true;
      req.session.user = user;

      // Đưa 1 số thông tin của user xuống client
      const userData = {
        email: req.session.user.email,
        fullname: req.session.user.fullname,
        phone: req.session.user.phone,
      };

      res.status(200).json({ message: "Đăng nhập thành công", user: userData });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserProfile = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const userData = {
    email: req.session.user.email,
    fullname: req.session.user.fullname,
    phone: req.session.user.phone,
  };

  res.status(200).json({ message: "Done", user: userData });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.status(201).json("Logged Out !!!");
  });
};
