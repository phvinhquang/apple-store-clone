const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Hàm xóa ảnh trên server
const clearImage = (filePath) => {
  // Câu dưới trong bài giảng nhưng không hiểu vì sao lại thế :v
  // filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Kiểm tra user có tồn tại không và role của user
    const user = await User.findOne({ email: email });
    if (!user || user.role !== "admin") {
      const error = new Error(
        "Thông tin đăng nhập không chính xác. Vui lòng thử lại"
      );
      error.statusCode = 401;
      throw error;
    }

    // Kiểm tra password
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      const error = new Error(
        "Thông tin đăng nhập không chính xác. Vui lòng thử lại"
      );
      error.statusCode = 401;
      throw error;
    } else if (correctPassword) {
      const token = jwt.sign(
        { userId: user._id.toString() },
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

exports.getProducts = async (req, res, next) => {
  const { query } = req.query;

  //Check auth
  try {
    if (query.length === 0) {
      const products = await Product.find().limit(10);
      return res.status(200).json(products);
    }
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(10);

    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;

  try {
    const ordersCount = await Order.countDocuments();
    const totalPages = Math.ceil(ordersCount / perPage);

    if (page > totalPages) {
      const error = new Error("Không thể xử lý yêu cầu");
      error.statusCode = 400;
      throw error;
    }

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    res.status(200).json({
      totalResult: ordersCount,
      totalPages: totalPages,
      currentPage: page,
      result: orders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOverall = async (req, res, next) => {
  const today = new Date().toDateString();

  try {
    // Tính tổng số người dùng
    const userCounts = await User.countDocuments();

    // Tính tổng số order trong ngày hôm nay (new orders)
    const orders = await Order.find();
    const editedOrders = orders.map((order) => {
      return { ...order, createdAt: order.createdAt.toDateString() };
    });
    const todayOrders = editedOrders.filter(
      (order) => order.createdAt === today
    );

    // Tính tổng doanh số
    const sale = orders.reduce((acc, cur) => acc + cur.products.totalAmount, 0);

    res.status(200).json({
      totalUsers: userCounts,
      totalSale: sale,
      new_orders: todayOrders.length,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Could not find product");
      err.statusCode = 422;
      throw error;
    }

    res.status(200).json({ product_detail: product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    if (req.files.length === 0 || req.files.length < 4) {
      console.log(req.files);
      const error = new Error("Không đủ ảnh");
      error.statusCode = 422;
      throw error;
    }

    const imageUrl = req.files.map(
      (file) => "http://localhost:5000/" + file.path.replace("\\", "/")
    );
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const stock = req.body.stock;
    const short_desc = req.body.short_desc;
    const long_desc = req.body.long_desc;
    // console.log("image Url", imageUrl[1]);
    // console.log(name, category, price, short_desc, long_desc);

    // console.log("stock", stock);

    const product = new Product({
      name: name,
      category: category,
      price: price,
      stock: stock,
      short_desc: short_desc,
      long_desc: long_desc,
      img1: imageUrl[0],
      img2: imageUrl[1],
      img3: imageUrl[2],
      img4: imageUrl[3],
    });

    // console.log("product được tạo", product);

    await product.save();

    res.status(201).json({
      message: "Product Created",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const productId = req.params.productId;

  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Không tìm thấy sản phẩm");
      error.statusCode = 404;
      throw error;
    }
    product.name = name;
    product.category = category;
    product.price = price;
    product.short_desc = short_desc;
    product.long_desc = long_desc;

    await product.save();

    res.status(201).json({ message: "Cập nhật sản phẩm thành công" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  // console.log(productId);

  try {
    const user = await User.findOne({ _id: req.userId });
    console.log(user);

    if (user.role !== "admin") {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Không tìm thấy sản phẩm");
      error.statusCode = 404;
      throw error;
    }
    // Xóa ảnh trên server
    clearImage(product.img1);
    clearImage(product.img2);
    clearImage(product.img3);
    clearImage(product.img4);

    await Product.findByIdAndRemove(productId);

    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
