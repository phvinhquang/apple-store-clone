import classes from "./ChatPageContainer.module.css";
import ChatMenu from "./ChatMenu";
import ChatBox from "./ChatBox";
import { useState } from "react";

const ChatPageContainer = function () {
  const [chatRoomId, setChatRoomId] = useState("");

  const chatRoomClickedHandler = function (chatroomId) {
    // console.log(typeof chatroomId);
    setChatRoomId(chatroomId);
  };

  return (
    <div className={classes["page-container"]}>
      <h1>Chat</h1>
      <h2>Apps / Chat</h2>

      <div className={classes.container}>
        <ChatMenu onChatRoomClicked={chatRoomClickedHandler} />
        <div className={classes.line}></div>
        <ChatBox chatRoomId={chatRoomId} />
      </div>
    </div>
  );
};

export default ChatPageContainer;
