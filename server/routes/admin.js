const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/login", adminController.postLogin);

router.get("/products", isAuth, adminController.getProducts);

router.get("/orders", isAuth, adminController.getOrders);

router.post(
  "/new-product",
  [
    body("name", "Tên sản phẩm không được để trống").trim().not().isEmpty(),
    body("price", "Giá sản phẩm không được để trống").trim().not().isEmpty(),
    body("stock", "Tồn kho sản phẩm không được để trống")
      .trim()
      .not()
      .isEmpty(),
    body("category", "Phân loại sản phẩm không được để trống")
      .trim()
      .not()
      .isEmpty(),
    body("short_desc", "Mô tả ngắn không được để trống").trim().not().isEmpty(),
    body("long_desc", "Mô tả dài không được để trống").trim().not().isEmpty(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.post(
  "/edit-product/:productId",
  [
    body("name", "Tên sản phẩm không được để trống").trim().not().isEmpty(),
    body("price", "Giá sản phẩm không được để trống").trim().not().isEmpty(),
    body("stock", "Tồn kho sản phẩm không được để trống")
      .trim()
      .not()
      .isEmpty(),
    body("category", "Phân loại sản phẩm không được để trống")
      .trim()
      .not()
      .isEmpty(),
    body("short_desc", "Mô tả ngắn không được để trống").trim().not().isEmpty(),
    body("long_desc", "Mô tả dài không được để trống").trim().not().isEmpty(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete(
  "/delete-product/:productId",
  isAuth,
  adminController.deleteProduct
);

router.get("/overall", isAuth, adminController.getOverall);

router.get(
  "/product-detail/:productId",
  isAuth,
  adminController.getProductDetail
);

module.exports = router;
