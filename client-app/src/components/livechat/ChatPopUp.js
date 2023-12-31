import React, { useEffect, useState, useRef } from "react";
import classes from "./ChatPopUp.module.css";
import admin from "../../images/admin.svg";
import { useSelector } from "react-redux";
import { getToken, getUserId } from "../../util/token";
import openSocket from "socket.io-client";

const ChatPopUp = function () {
  const [messages, setMessages] = useState([]);
  const [chatroomId, setChatroomId] = useState("");
  const [text, setText] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const userId = getUserId();
  const token = getToken();
  const scrollRef = useRef();

  //Fetch chatroom
  const fetchChatroom = async function () {
    try {
      const res = await fetch(
        "https://apple-store-server-0biu.onrender.com/chatroom",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await res.json();
      // console.log(data);
      setMessages(data.messages || []);
      setChatroomId(data.chatroomId);
    } catch (err) {
      console.log(err);
    }
  };

  // Cập nhật text
  const textChangeHandler = function (e) {
    setText(e.target.value);
  };

  // Hàm gửi tin nhắn
  const postMessage = async function (formData) {
    try {
      const res = await fetch(
        "https://apple-store-server-0biu.onrender.com/add-chat-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (res.status === 201) {
        setText("");
        setMessages((prev) => [...prev, formData]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Hàm update message từ socket
  const updateMessages = function (data) {
    setMessages((prev) => [...prev, data]);
  };

  // Xử lý sự kiện gửi tin nhắn
  const keyHandler = function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (text === "") {
        return;
      }

      // Gửi tin nhắn khi nhấn Enter
      const formData = {
        chatroomId: chatroomId,
        sender: userId,
        text: text,
      };
      postMessage(formData);
    }

    // Xuống dòng với Shift + Enter
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setText((prev) => prev + "\r\n");
    }
  };

  const sendMessageHandler = function () {
    if (text === "") {
      return;
    }

    const formData = {
      chatroomId: chatroomId,
      sender: userId,
      text: text,
    };

    postMessage(formData);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchChatroom();
    }

    const socket = openSocket("https://apple-store-server-0biu.onrender.com/");

    socket.emit("client-connect", userId);
    socket.on("new-message", (data) => {
      updateMessages(data);
    });
    // socket.on("clients-list", (clients) => {
    //   console.log("online users", clients);
    // });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2>Customer Support</h2>
          <h3>Let's Chat App</h3>
        </div>

        <div className={classes["chat-frame"]}>
          {isLoggedIn && (
            <div className={classes["messages-container"]}>
              {messages?.map((message) => (
                <div
                  ref={scrollRef}
                  key={message._id}
                  className={`${
                    message.sender === "admin"
                      ? classes["chat-left"]
                      : classes["chat-right"]
                  }`}
                >
                  {message.sender === "admin" && <img src={admin} />}

                  <span>
                    {message.sender === "admin" && "ADMIN: "}
                    {message.text}
                  </span>
                </div>
              ))}
              {/* <div className={classes["chat-right"]}>
                <span>Xin chào</span>
              </div>
              <div className={classes["chat-right"]}>
                <span>Làm thế nào để xem các sản phẩm</span>
              </div>

              <div className={classes["chat-left"]}>
                <img src={admin} />
                <span>ADMIN: Chào bạn</span>
              </div>
              <div className={classes["chat-left"]}>
                <img src={admin} />
                <span>ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm.</span>
              </div> */}
            </div>
          )}
          {!isLoggedIn && (
            <p className={classes["chat-login-text"]}>
              Bạn hãy đăng nhập để sử dụng chức năng chat
            </p>
          )}
        </div>

        <div className={classes["chat-actions"]}>
          <div className={classes["chat-input"]}>
            <img src={admin} />
            <input
              onChange={textChangeHandler}
              value={text}
              type="text"
              placeholder="Enter Message!"
              onKeyDown={keyHandler}
            />
          </div>

          <div className={classes["action-icons"]}>
            <i className="fa-solid fa-paperclip"></i>
            <i className="fa-solid fa-face-smile"></i>
            <button
              className={classes.btn}
              onClick={sendMessageHandler}
              type="button"
            >
              <i className="fa-brands fa-telegram"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopUp;
