import React from "react";
import classes from "./CartBanner.module.css";

const CartBanner = function () {
  return (
    <div className={classes.banner}>
      <h2 className={classes["banner-item-left"]}>CART</h2>
      <h3 className={classes["banner-item-right"]}>CART</h3>
    </div>
  );
};

export default CartBanner;
