const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

const shopController = require("../controllers/shop");

router.get("/homepage", shopController.getHomePage);

router.get("/all", shopController.getAllProducts);

router.get("/cart", isAuth, shopController.getCart);

router.post("/add-to-cart", isAuth, shopController.postAddToCart);

router.post(
  "/add-order",
  [
    body("orderer.fullname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Bạn không được để trống tên"),
    body("orderer.email")
      .trim()
      .isEmail()
      .withMessage("Email không đúng cấu trúc"),
    body("orderer.phone")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Số điện thoại có tối thiểu 10 chữ số")
      .isLength({ max: 11 })
      .withMessage("Số điện thoại có tối đa 11 chữ số"),
    body("orderer.address")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Bạn không được để trống địa chỉ"),
  ],
  isAuth,
  shopController.postAddOrder
);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/product-detail/:productId", shopController.getProductDetail);

router.get("/orders/:orderId", isAuth, shopController.getOrderDetail);

module.exports = router;
