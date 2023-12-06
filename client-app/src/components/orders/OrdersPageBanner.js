import React from "react";
import classes from "./OrdersPageBanner.module.css";

const OrdersPageBanner = function () {
  return (
    <div className={classes.banner}>
      <h2 className={classes["banner-item-left"]}>HISTORY</h2>
      <h3 className={classes["banner-item-right"]}>
        <span>HISTORY</span>
      </h3>
    </div>
  );
};

export default OrdersPageBanner;
