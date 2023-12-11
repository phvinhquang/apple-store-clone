import React from "react";
import classes from "./ChatPopUp.module.css";
import admin from "../../images/admin.svg";
import { useSelector } from "react-redux";

const ChatPopUp = function () {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  //Fetch tin nhắn theo userId, nếu không có chatroom nào tương ứng thì có nút bắt đầu tin nhắn.

  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2>Customer Support</h2>
          <h3>Let's Chat App</h3>
        </div>

        <div className={classes["chat-frame"]}>
          {isLoggedIn && (
            <div>
              <div className={classes["chat-right"]}>
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
              </div>
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
            <input type="text" placeholder="Enter Message!" />
          </div>

          <div className={classes["action-icons"]}>
            <i className="fa-solid fa-paperclip"></i>
            <i className="fa-solid fa-face-smile"></i>
            <i className="fa-brands fa-telegram"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopUp;
