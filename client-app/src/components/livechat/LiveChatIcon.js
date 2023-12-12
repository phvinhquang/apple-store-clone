import React from "react";
import classes from "./LiveChatIcon.module.css";
import { useDispatch } from "react-redux";
import { customerChatActions } from "../../store/customerchat";

const LiveChatIcon = function () {
  const dispatch = useDispatch();

  const toggleChatPopUpHandler = function () {
    dispatch(customerChatActions.toggleChatPopUp());
  };

  return (
    <div onClick={toggleChatPopUpHandler} className={classes["chat-icon"]}>
      <i className="fa-brands fa-facebook-messenger"></i>
    </div>
  );
};

export default LiveChatIcon;
