import React from "react";
import classes from "./OrderDetailProducts.module.css";

const OrderDetailProducts = function ({ products }) {
  return (
    <table cellSpacing="0" className={classes.table}>
      <thead>
        <tr>
          <td>ID PRODUCT</td>
          <td>IMAGE</td>
          <td>NAME</td>
          <td>PRICE</td>
          <td>COUNT</td>
        </tr>
      </thead>

      <tbody>
        {products &&
          products.items.map((item) => (
            <tr key={item.productId._id}>
              <td>{item.productId._id}</td>
              <td className={classes.img}>
                <img src={item.productId.img1} />
              </td>
              <td>{item.name}</td>
              <td>{item.productId.price.toLocaleString("de-DE")}đ</td>
              <td>{item.amount}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
