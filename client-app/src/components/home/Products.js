import React, { useState } from "react";
import classes from "./Products.module.css";

import { useSelector, useDispatch } from "react-redux";
import { popUpActions } from "../../store/popup";
import ProductPopUp from "../../UI/ProductPopUp";

const Products = function (props) {
  // const [products, setProducts] = useState([]);
  const [clickedOnImg, setClickedOnImg] = useState("");
  const popUpIsShown = useSelector((state) => state.popup.isShown);
  const dispatch = useDispatch();

  const showPopUpHandler = function (e) {
    setClickedOnImg(e.target.id);
    dispatch(popUpActions.showPopUp());
  };

  const closePopUpHandler = function () {
    dispatch(popUpActions.hidePopUp());
  };

  return (
    <React.Fragment>
      <div className={classes.title}>
        <h3>MADE THE HARD WAY</h3>
        <h1>TOP TRENDING PRODUCTS</h1>
      </div>
      <div className={classes.container}>
        {props.products.map((product) => (
          <div key={product.name} className={classes.product}>
            <div className={classes["img-container"]}>
              <img
                id={product._id}
                onClick={showPopUpHandler}
                src={product.img1}
                alt={product.short_desc}
              />
            </div>
            <div className={classes["product-info"]}>
              <h3>{product.name}</h3>
              <h4>{Number(product.price).toLocaleString("de-DE")} VND</h4>
            </div>
            {popUpIsShown && clickedOnImg === product._id && (
              <ProductPopUp
                id={product._id}
                img={product.img1}
                name={product.name}
                price={product.price}
                desc={product.short_desc}
                onClose={closePopUpHandler}
              />
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Products;
