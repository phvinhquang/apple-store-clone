const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat");
const isAuth = require("../middleware/is-auth");

router.post("/add-chat-room", chatController.postAddChatRoom);

router.post("/add-chat-message", chatController.addChatMessage);

module.exports = router;
