import React from "react";
import classes from "./ShopBanner.module.css";

const ShopBanner = function () {
  return (
    <div className={classes.banner}>
      <h2 className={classes["banner-item-left"]}>SHOP</h2>
      <h3 className={classes["banner-item-right"]}>SHOP</h3>
    </div>
  );
};

export default ShopBanner;
