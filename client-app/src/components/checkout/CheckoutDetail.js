import React from "react";
import classes from "./CheckoutDetail.module.css";
import { useSelector } from "react-redux";

const CheckoutDetail = function () {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => state.cart.items);

  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <h1>YOUR ORDER</h1>
        <div>
          {items.map((item) => (
            <div key={item.id} className={classes["flexbox-items"]}>
              <h3>{item.name}</h3>
              <h5>
                {Number(item.price).toLocaleString("de-DE")} VND x {item.amount}
              </h5>
            </div>
          ))}
        </div>

        <div className={classes["flexbox"]}>
          <h3>TOTAL</h3>
          <h4>{totalAmount.toLocaleString("de-DE")} VND</h4>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;
