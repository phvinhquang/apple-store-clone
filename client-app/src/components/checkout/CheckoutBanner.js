import React from "react";
import classes from "./CheckoutBanner.module.css";

const CheckoutBanner = function () {
  return (
    <div className={classes.banner}>
      <h2 className={classes["banner-item-left"]}>CHECKOUT</h2>
      <h3 className={classes["banner-item-right"]}>
        HOME / CART / <span>CHECKOUT</span>
      </h3>
    </div>
  );
};

export default CheckoutBanner;
