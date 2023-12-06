const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chatroom", chatroomSchema);
