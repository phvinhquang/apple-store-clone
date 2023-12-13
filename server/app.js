require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const User = require("./models/user");
const socketIO = require("./socket");

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

// IMPORT ROUTES
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors());

app.use(bodyParser.json()); // application/json
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).array("images", 4)
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(authRoutes);
app.use("/products", shopRoutes);
app.use("/admin", adminRoutes);
app.use(chatRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@funix-njs301-mongodb.1vi2stm.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    const server = app.listen(process.env.PORT || 5000);

    // Set up socket.io
    const io = socketIO.init(server);

    const addClient = function (userId, socketId) {
      if (!socketIO.clients.some((user) => user.userId === userId)) {
        socketIO.clients.push({ userId, socketId });
      }
    };

    // On sự kiện connect của client và admin
    io.on("connection", (socket) => {
      socket.on("client-connect", (userId) => {
        // Xử lý client data và đưa vào array
        addClient(userId, socket.id);
        io.emit("clients-list", socketIO.clients);
      });

      socket.on("admin-connect", (data) => {
        socket.join("admin-room");
        // io.to("admin-room").emit("hello-admin", "Hello this is ....");
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
