const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/user");

const authController = require("../controllers/auth");

// SIGN UP
router.post(
  "/signup",
  [
    body("fullname", "Bạn không được để trống tên").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Bạn cần nhập email đúng cấu trúc.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "Email đã tồn tại trên hệ thống. Hãy sử dụng 1 email khác."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Mật khẩu cần có tối thiểu 6 kí tự")
      .trim()
      .isLength({ min: 6 }),
    body("phone", "Số điện thoại có 10-11 kí tự")
      .trim()
      .isLength({ min: 10, max: 11 }),
  ],
  authController.postSignup
);

//LOGIN
router.post("/login", authController.postLogin);

// GET USER PROFILE
router.get("/user-profile", authController.getUserProfile);

// LOGOUT
router.post("/logout", authController.postLogout);

module.exports = router;
