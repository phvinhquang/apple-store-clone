import classes from "./ChatMenu.module.css";
import img from "../../user.png";

const ChatMenu = function () {
  return (
    // Flexbox
    <div className={classes.container}>
      <div className={classes["search"]}>
        <input type="text" placeholder="Search Contact" />
      </div>

      {/* Khi nao map thì retuern cái này */}
      <div className={classes["flex-item"]}>
        <img src={img} alt="User" />
        <div className={classes.conversation}>
          <p>ID khác hàng </p>
          <p>Ví dụ thế</p>
        </div>
      </div>
      <div className={classes["flex-item"]}>
        <img src={img} alt="User" />
        <div className={classes.conversation}>
          <p>ID khác hàng </p>
          <p>Ví dụ thế</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
