import React from "react";
import classes from "./RelatedProducts.module.css";
import { Link } from "react-router-dom";

const RelatedProducts = function (props) {
  return (
    <div className={classes.related}>
      <h1>RELATED PRODUCTS</h1>
      <div className={classes.container}>
        {props.relatedProducts &&
          props.relatedProducts.map((product) => (
            <Link key={product._id} to={`/detail/${product._id}`}>
              <div className={classes.product}>
                <div className={classes.img}>
                  <img src={product.img1} />
                </div>
                <h3>{product.name}</h3>
                <h4>{Number(product.price).toLocaleString("de-DE")} VND</h4>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
