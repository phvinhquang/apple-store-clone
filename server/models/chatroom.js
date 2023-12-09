const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema(
  {
    members: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chatroom", chatroomSchema);
