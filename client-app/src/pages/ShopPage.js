import React from "react";
import ShopBanner from "../components/shop/ShopBanner";
import ShopMain from "../components/shop/ShopMain";

import { useLoaderData } from "react-router-dom";

function ShopPage() {
  const products = useLoaderData();
  return (
    <React.Fragment>
      <ShopBanner />
      <ShopMain products={products} />
    </React.Fragment>
  );
}

export default ShopPage;

export const loader = async function () {
  const res = await fetch("http://localhost:5000/products/all");

  const data = await res.json();
  return data;
};
