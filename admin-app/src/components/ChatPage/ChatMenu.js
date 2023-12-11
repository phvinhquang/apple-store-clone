import classes from "./ChatMenu.module.css";
import img from "../../user.png";
import { serverUrl, getToken } from "../../utils/auth";
import { useCallback, useEffect, useState } from "react";

const ChatMenu = function (props) {
  const [chatrooms, setChatrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(false);
  const [error, setError] = useState(false);

  const url = serverUrl;
  const token = getToken();

  const fetchChatrooms = useCallback(
    async function () {
      try {
        const res = await fetch(`${url}chatrooms`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();
        console.log(data);
        setChatrooms(data.chatrooms);
      } catch (err) {
        setError(err.message);
      }
    },
    [url]
  );

  useEffect(() => {
    fetchChatrooms();
  }, [fetchChatrooms]);

  const showMessages = function (chatroomId) {
    // console.log(chatroomId);
    setSelectedChat(chatroomId);
    props.onChatRoomClicked(chatroomId);
  };

  return (
    // Flexbox
    <div className={classes.container}>
      <div className={classes["search"]}>
        <input type="text" placeholder="Search Contact" />
      </div>

      {/* Khi nao map thì return cái này */}
      {chatrooms.map((chat) => {
        return (
          <div
            onClick={showMessages.bind(this, chat._id)}
            key={chat._id}
            className={`${classes["flex-item"]} ${
              chat._id === selectedChat ? classes.selected : ""
            }`}
          >
            <img src={img} alt="User" />
            <div className={classes.conversation}>
              <p>KH: {chat.username} </p>
              <p>ID: {chat._id}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMenu;
