const Chatroom = require("../models/chatroom.js");
const ChatMessage = require("../models/chat-message.js");
const User = require("../models/user.js");

exports.getChatRooms = async (req, res, next) => {
  try {
    // Sort theo tin nhắn mới nhất
    const chatrooms = await Chatroom.find().sort({
      createdAt: -1,
    });

    // const chatroomsMap = function () {
    //   return Promise.all(
    //     chatrooms.map((chatroom) => {
    //       const user = User.findById(chatroom.members);
    //       return { ...chatroom._doc, username: user.fullname };
    //     })
    //   );
    // };

    const updatedChatrooms = await Promise.all(
      chatrooms.map(async (chatroom) => {
        const user = await User.findById(chatroom.members);
        return { ...chatroom._doc, username: user.fullname };
      })
    );

    res.status(200).json({ chatrooms: updatedChatrooms });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get Chatroom cho client
exports.getChatroom = async (req, res, next) => {
  try {
    const chatroom = await Chatroom.findOne({ members: req.userId });
    // console.log("chatroom", chatroom);
    // console.log(req.userId);
    if (!chatroom) {
      return res.status(404).json({ message: "No chatroom" });
    }

    const messages = await ChatMessage.find({ chatroomId: chatroom._id });
    res.status(200).json({ chatroomId: chatroom._id, messages: messages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  const chatroomId = req.params.chatroomId;

  try {
    const messages = await ChatMessage.find({ chatroomId: chatroomId });

    res.status(200).json({ messages: messages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

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
  const chatroomId = req.body.chatroomId;
  const userId = req.userId;
  const text = req.body.text;

  let chatroom;
  try {
    if (req.userRole !== "admin") {
      chatroom = await Chatroom.findOne({ members: req.userId.toString() });
    } else {
      chatroom = await Chatroom.findById(chatroomId);
    }

    ////////////////////////////////////////
    if (!chatroom) {
      // const error = new Error("Không thể tìm thấy phòng chat của bạn");
      // error.statusCode = 404;
      // throw error;

      chatroom = new Chatroom({
        // members: req.userId.toString(),
        members: userId,
      });

      await chatroom.save();
    }

    const message = new ChatMessage({
      chatroomId: chatroom._id,
      sender: req.userRole === "admin" ? "admin" : userId.toString(),
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
