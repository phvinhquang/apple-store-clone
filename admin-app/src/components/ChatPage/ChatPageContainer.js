import classes from "./ChatPageContainer.module.css";
import ChatMenu from "./ChatMenu";
import ChatBox from "./ChatBox";
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { serverUrl } from "../../utils/auth";

const ChatPageContainer = function () {
  const [chatRoomId, setChatRoomId] = useState("");
  const [newMessage, setNewMessage] = useState(null);

  const url = serverUrl;

  const handleNewMessage = function (data) {
    setNewMessage(data);
  };

  useEffect(() => {
    const socket = openSocket(`${url}`);

    socket.emit("admin-connect", "admin");
    socket.on("new-message", (data) => {
      handleNewMessage(data);
    });
  }, []);

  const chatRoomClickedHandler = function (chatroomId) {
    setChatRoomId(chatroomId);
  };

  return (
    <div className={classes["page-container"]}>
      <h1>Chat</h1>
      <h2>Apps / Chat</h2>

      <div className={classes.container}>
        <ChatMenu onChatRoomClicked={chatRoomClickedHandler} />
        <div className={classes.line}></div>
        <ChatBox chatRoomId={chatRoomId} newMessage={newMessage} />
      </div>
    </div>
  );
};

export default ChatPageContainer;
