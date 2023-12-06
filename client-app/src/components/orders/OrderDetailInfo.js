import React from "react";
import classes from "./OrderDetailInfo.module.css";

const OrderDetailInfo = function ({ order }) {
  return (
    <div className={classes["info-container"]}>
      <h1>ORDER INFORMATION</h1>
      <p>ID User: {order && order.userId} </p>
      <p>Full Name: {order && order.orderer.fullname} </p>
      <p>Phone: {order && order.orderer.phone} </p>
      <p>Address: {order && order.orderer.address} </p>
      <p>
        Total: {order && order.products.totalAmount.toLocaleString("de-DE")}đ
      </p>
    </div>
  );
};

export default OrderDetailInfo;
