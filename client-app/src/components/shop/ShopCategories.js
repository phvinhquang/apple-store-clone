import React, { useState } from "react";
import classes from "./ShopCategories.module.css";

const ShopCategories = function (props) {
  const [chosenCategory, setChosenCategory] = useState("");

  const sortingHandler = function (event) {
    setChosenCategory(event.target.id);

    props.onFilter(event.target.id);
  };

  return (
    <div className={classes.categories}>
      <h1>CATEGORIES</h1>
      <h2 className={classes["brand-name"]}>APPLE</h2>
      <p onClick={sortingHandler} className={classes.options} id="all">
        All
      </p>

      <h2 className={classes["cat-title"]}>IPHONE & MAC</h2>
      <p
        onClick={sortingHandler}
        className={`${classes.options} ${
          chosenCategory === 0 ? classes.active : undefined
        }`}
        id="iphone"
      >
        Iphone
      </p>

      <p onClick={sortingHandler} className={classes.options} id="ipad">
        Ipad
      </p>
      <p onClick={sortingHandler} className={classes.options} id="macbook">
        Macbook
      </p>

      <h2 className={classes["cat-title"]}>WIRELESS</h2>
      <p onClick={sortingHandler} className={classes.options} id="airpod">
        Airpod
      </p>
      <p onClick={sortingHandler} className={classes.options} id="watch">
        Watch
      </p>

      <h2 className={classes["cat-title"]}>OTHERS</h2>
      <p onClick={sortingHandler} className={classes.options} id="mouse">
        Mousse
      </p>
      <p onClick={sortingHandler} className={classes.options} id="keyboard">
        Keyboard
      </p>
      <p onClick={sortingHandler} className={classes.options} id="other">
        Other
      </p>
    </div>
  );
};

export default ShopCategories;
