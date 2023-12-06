const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const transport = nodemailer.createTransport({
  host: "smtp.gmail.email",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "jeremypisces04@gmail.com",
    pass: "svio megn rccb geeb",
  },
});

exports.getHomePage = async (req, res, next) => {
  const bannerPath = path.join("images", "banner1.jpg");
  const cat1Path = path.join("images", "product_1.png");
  const cat2Path = path.join("images", "product_2.png");
  const cat3Path = path.join("images", "product_3.png");
  const cat4Path = path.join("images", "product_4.png");
  const cat5Path = path.join("images", "product_5.png");

  try {
    const products = await Product.find().limit(8);

    res.status(200).json({
      products: products,
      banner: bannerPath,
      category: [cat1Path, cat2Path, cat3Path, cat4Path, cat5Path],
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      const error = new Error("No product found");
      throw error;
    }

    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      const error = new Error("Could not find post");
      err.statusCode = 422;
      throw error;
    }
    const category = product.category;
    const relatedProducts = await Product.find({
      category: category,
      _id: { $ne: product._id },
    });

    res
      .status(200)
      .json({ product_detail: product, related_products: relatedProducts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      const error = new Error("Unauthorized !");
      err.statusCode = 401;
      throw error;
    }
    await user.populate("cart.items.productId");

    const updatedItems = user.cart.items.map((item) => {
      return {
        id: item.productId._id,
        name: item.productId.name,
        img: item.productId.img1,
        price: Number(item.productId.price),
        amount: item.amount,
      };
    });

    const updatedCart = { ...user.cart, items: updatedItems };

    res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAddToCart = async (req, res, next) => {
  const items = req.body.items;
  const totalAmount = req.body.totalAmount;

  const updatedCart = { items: items, totalAmount: totalAmount };

  try {
    const user = req.user;
    if (!user) {
      const error = new Error("Unauthorized !");
      err.statusCode = 401;
      throw error;
    }
    user.cart = updatedCart;
    await user.save();

    res.status(201).json({
      message: "Added to cart",
      // items: items,
      // totalAmount: totalAmount,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAddOrder = async (req, res, next) => {
  try {
    // Xác định lỗi validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    // Lấy dữ liệu từ body
    const customerFullname = req.body.orderer.fullname;
    const customerEmail = req.body.orderer.email;
    const customerPhone = req.body.orderer.phone;
    const customerAddress = req.body.orderer.address;

    const items = req.body.products.items;
    const totalAmount = req.body.products.totalAmount;

    // Tạo order trong database
    const order = new Order({
      userId: req.user._id,
      orderer: {
        fullname: customerFullname,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
      },
      products: {
        items: items,
        totalAmount: totalAmount,
      },
    });

    await order.save();

    // Cập nhật stock sản phẩm
    let bulkArr = [];
    items.forEach((item) => {
      bulkArr.push({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(item.productId) },
          update: { $inc: { stock: -item.amount } },
        },
      });
    });

    await Product.bulkWrite(bulkArr);

    // SEND EMAIL
    const emailPath = path.join(
      __dirname,
      "../",
      "views",
      "email-confirm-order.ejs"
    );
    const emailToSend = await ejs.renderFile(emailPath, {
      orderer: {
        fullname: customerFullname,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
      },
      products: {
        items: items,
        totalAmount: Number(totalAmount).toLocaleString("de-DE"),
      },
    });

    // RESPONSE
    res.status(201).json({ message: "Order created" });

    await transport.sendMail({
      from: '"Quang Apple" Store <quangapplestore@gmail.com>', // sender address
      to: customerEmail,
      subject: "Quang's Apple Store - Order Confirm",
      html: emailToSend,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrderDetail = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Không tìm thấy order");
      error.statusCode = 404;
      throw error;
    }
    if (order.userId.toString() !== req.user._id.toString()) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    await order.populate("products.items.productId", "img1 price");
    res.status(200).json(order);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
