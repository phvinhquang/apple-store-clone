import classes from "./ChatPageContainer.module.css";
import ChatMenu from "./ChatMenu";
import ChatBox from "./ChatBox";

const ChatPageContainer = function () {
  return (
    <div className={classes["page-container"]}>
      <h1>Chat</h1>
      <h2>Apps / Chat</h2>

      <div className={classes.container}>
        <ChatMenu />
        <div className={classes.line}></div>
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPageContainer;
