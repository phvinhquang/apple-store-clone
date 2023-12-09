import classes from "./ChatBox.module.css";
import userImg from "../../user.png";

const ChatBox = function () {
  return (
    <div className={classes.container}>
      <div className={classes["messages-container"]}>
        {/* Map return ra */}
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message. A very long message. A very long message. A very long
            message. A very long message. A very long message. A very long
            message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>

        <div className={`${classes.message} ${classes.own}`}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>

        {/* Test scroll, sau xóa đi */}
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
        <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div>
      </div>

      <div className={classes["input-container"]}>
        <div className={classes["input-flexbox"]}>
          <textarea placeholder="Enter your message"></textarea>
          <button>
            <i className="fa-brands fa-telegram"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
