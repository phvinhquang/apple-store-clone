const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/user");

// Thiết lập ban đầu cho multer
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// BỎ
// Store lưu session
const store = new MongoDBStore({
  uri: `mongodb+srv://jeremy:Cfc1031905@funix-njs301-mongodb.1vi2stm.mongodb.net/njs-asm3?retryWrites=true&w=majority`,
  collection: "sessions",
  autoRemove: "native",
});

// IMPORT ROUTES
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

const app = express();

//BỎ
// trust proxy dùng khi deploy, dev thì không dùng
// app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      // "https://apple-store-client.firebaseapp.com",
      // "https://apple-store-admin.firebaseapp.com",
      "http://localhost:3000",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE", "HEAD"],
    credentials: true,
  })
);

app.use(bodyParser.json()); // application/json
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).array("images", 4)
);
app.use("/images", express.static(path.join(__dirname, "images")));

// BỎ
app.use(
  session({
    secret: "session secret string",
    resave: false,
    saveUninitialized: false,

    cookie: {
      // Dev thì samesite để lax, secure là false
      // Frontend thêm proxy vào package-lock.json
      // Deploy thì sameSite none, secure true
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 3, // 3 tiếng,
      // httpOnly: true,
    },
    store: store,
  })
);

// Đưa User instace vào resquest
app.use((req, res, next) => {
  //Nếu không có user thì next
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
// BỎ ĐẾN ĐÂY

app.use(authRoutes);
app.use("/products", shopRoutes);
app.use("/admin", adminRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://jeremy:Cfc1031905@funix-njs301-mongodb.1vi2stm.mongodb.net/njs-asm3?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch();
