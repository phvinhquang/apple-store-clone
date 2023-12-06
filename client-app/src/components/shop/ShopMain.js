import React, { useState } from "react";
import classes from "./ShopMain.module.css";
import ShopCategories from "./ShopCategories";
import ProductsList from "./ProductsList";

const ShopMain = function (props) {
  const products = [...props.products];

  const [loadedProducts, setLoadedProducts] = useState(products);

  let filteredProducts = [];

  const filterHandler = function (chosenCategory) {
    if (chosenCategory === "all" || !chosenCategory) {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(
        (product) => product.category === chosenCategory
      );
    }

    setLoadedProducts(filteredProducts);
  };

  return (
    <section className={classes.flex}>
      <ShopCategories onFilter={filterHandler} />
      <ProductsList products={loadedProducts} />
    </section>
  );
};

export default ShopMain;
