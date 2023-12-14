const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat");
const isAuth = require("../middleware/is-auth");
const isAuthAdmin = require("../middleware/is-auth-admin");

router.get("/chatrooms", isAuth, chatController.getChatRooms);

router.get("/chatroom", isAuth, chatController.getChatroom);

router.get("/messages/:chatroomId", chatController.getMessages);

router.post("/add-chat-room", chatController.postAddChatRoom);

router.post("/add-chat-message", isAuth, chatController.addChatMessage);

module.exports = router;
