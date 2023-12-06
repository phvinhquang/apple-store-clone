import React from "react";
import classes from "./LongDescription.module.css";

const LongDescription = function ({ product }) {
  return (
    <>
      {product && (
        <div className={classes["long-desc"]}>
          <h3>DESCRIPTION</h3>
          <h1>PRODUCT DESCRIPTION</h1>
          <p>{product.long_desc}</p>
        </div>
      )}
    </>
  );
};

export default LongDescription;
