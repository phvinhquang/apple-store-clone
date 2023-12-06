import React from "react";
import Banner from "../components/home/Banner";
import Catergories from "../components/home/Categories";
import Products from "../components/home/Products";
import AdditionalInfo from "../components/home/AdditionalInfo";

import { useLoaderData } from "react-router-dom";

function HomePage() {
  const { banner, category, products } = useLoaderData();

  return (
    <React.Fragment>
      <Banner img={banner} />
      <Catergories imgs={category} />
      <Products products={products} />
      <AdditionalInfo />
    </React.Fragment>
  );
}

export default HomePage;

export const loader = async function () {
  const res = await fetch("http://localhost:5000/products/homepage");

  const data = await res.json();
  return data;
};
