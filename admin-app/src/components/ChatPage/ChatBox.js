import classes from "./ChatBox.module.css";
import userImg from "../../user.png";
import { useState, useEffect, useCallback, useRef } from "react";
import { serverUrl, getToken } from "../../utils/auth";

const ChatBox = function (props) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [sendMessErr, setSendMessErr] = useState(false);
  const [text, setText] = useState("");

  const url = serverUrl;
  const token = getToken();
  const scrollToView = useRef();

  // Hàm fetch message từ server
  const fetchMessages = useCallback(
    async (chatroomId) => {
      try {
        const res = await fetch(`${url}messages/${chatroomId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();
        // console.log(data.messages);
        setMessages(data.messages);
      } catch (err) {
        setError(err.message);
      }
    },
    [url]
  );

  // Hàm gửi tin nhắn
  const sendMessage = async function (formData) {
    try {
      const res = await fetch(`${url}add-chat-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        setText("");
        setMessages((prev) => [...prev, formData]);
      }
    } catch (err) {
      setSendMessErr(err.message);
    }
  };

  // Hàm cập nhật textarea
  const textChangeHandler = function (e) {
    setText(e.target.value);
  };

  // Hàm xử lý sự kiện gửi tin nhắn
  const sendMessageHandler = function () {
    if (text === "") {
      return;
    }

    const data = {
      chatroomId: props.chatRoomId,
      sender: "admin",
      text: text,
    };

    sendMessage(data);
  };

  useEffect(() => {
    if (props.chatRoomId !== "") {
      // console.log("useEffect running", props.chatRoomId);
      fetchMessages(props.chatRoomId);
    }
  }, [props.chatRoomId, fetchMessages]);

  // Code auto scroll đến tin mới nhất
  useEffect(() => {
    // Cách khác
    // scrollToView.current.addEventListener("DOMNodeInserted", (event) => {
    //   const { currentTarget: target } = event;
    //   target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    // });

    scrollToView.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (props.newMessage) {
      setMessages((prev) => [...prev, props.newMessage]);
    }
  }, [props.newMessage]);

  return (
    <div className={classes.container}>
      <div className={classes["messages-container"]}>
        {/* Map return ra */}
        {messages.map((message) => (
          <div
            ref={scrollToView}
            key={message._id}
            className={`${classes.message} ${
              message.sender === "admin" ? classes.own : ""
            }`}
          >
            <img src={userImg} alt="user-avatar" />
            <p>{message.text}</p>
          </div>
        ))}

        {/* <div className={classes.message}>
          <img src={userImg} alt="user-avatar" />
          <p>
            Client: This is a message. A very long message. A very long message.
            A very long message. A very long message. A very long message. A
            very long message. A very long message. A very long message. A very
            long message.
          </p>
        </div> */}
      </div>

      <div className={classes["input-container"]}>
        <div className={classes["input-flexbox"]}>
          <textarea
            onChange={textChangeHandler}
            value={text}
            placeholder="Enter your message"
          ></textarea>
          <button type="button" onClick={sendMessageHandler}>
            <i className="fa-brands fa-telegram"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
