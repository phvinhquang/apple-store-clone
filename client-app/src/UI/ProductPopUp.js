import React from "react";
import ReactDOM from "react-dom";
import classes from "./ProductPopUp.module.css";
import { Link } from "react-router-dom";

const Backdrop = function (props) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = function (props) {
  return (
    <div>
      <div className={classes.popup}>
        <div className={`${classes["img-container"]} `}>
          <img src={props.img} alt="Sản phẩm" />
        </div>
        <div className={`${classes["product-info"]}`}>
          <h3>{props.name}</h3>
          <h4>{Number(props.price).toLocaleString("de-DE")} VND</h4>
          <p>{props.desc}</p>
          <Link to={`/detail/${props.id}`}>
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
              <spa> View Detail </spa>
            </button>
          </Link>
        </div>
        <div className={classes.close}>
          <i onClick={props.onClose} className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

const ProductPopUp = function (props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          id={props.id}
          img={props.img}
          name={props.name}
          price={props.price}
          desc={props.desc}
          onClose={props.onClose}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ProductPopUp;
