const Chatroom = require("../models/chatroom.js");
const ChatMessage = require("../models/chat-message.js");

exports.postAddChatRoom = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    // Nếu user đã có chatroom rồi thì không tạo mới
    const existingChatroom = await Chatroom.findOne({ members: userId });
    if (existingChatroom) {
      const error = new Error("Chatroom đã tồn tại");
      error.statusCode = 409;
      throw error;
    }

    const chatRoom = new Chatroom({
      // members: req.userId.toString(),
      members: userId,
    });

    await chatRoom.save();

    res.status(201).json({ message: "Chatroom Created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addChatMessage = async (req, res, next) => {
  // Tìm chatroom mà userId thuộc về (để tránh người dùng fake chatroomId)

  // Sau khi apply isAuth sẽ dùng req.userId
  const userId = req.body.userId;
  const text = req.body.text;

  try {
    const chatroom = await Chatroom.findOne({ members: userId.toString() });
    if (!chatroom) {
      const error = new Error("Không thể tìm thấy phòng chat của bạn");
      error.statusCode = 404;
      throw error;
    }

    const message = new ChatMessage({
      chatroomId: chatroom._id,
      sender: userId.toString(),
      text: text,
    });
    message.save();

    res.status(201).json({ message: "Message sent successfully !" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
