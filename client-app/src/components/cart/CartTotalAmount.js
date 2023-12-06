import React from "react";
import classes from "./CartTotalAmount.module.css";
import { useSelector } from "react-redux";

const CartTotalAmout = function () {
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <h1>CART TOTAL</h1>

        <div className={`${classes["total-flexbox"]} ${classes.subtotal}`}>
          <h3>SUBTOTAL</h3>
          <h5>{totalAmount.toLocaleString("de-DE")} VND</h5>
        </div>

        <div className={classes["total-flexbox"]}>
          <h3>TOTAL</h3>
          <h4>{totalAmount.toLocaleString("de-DE")} VND</h4>
        </div>

        <div className={classes.coupon}>
          <input type="text" placeholder="Enter your coupon" />
          <button>
            <i className="fa-solid fa-gift"></i>
            <span>Apply coupon</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTotalAmout;
