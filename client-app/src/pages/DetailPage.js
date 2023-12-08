import React from "react";

import MainDetail from "../components/detail/MainDetail";
import LongDescription from "../components/detail/LongDescription";
import RelatedProducts from "../components/detail/RelatedProducts";

import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";

function DetailPage() {
  const data = useLoaderData();
  const params = useParams();

  const loadedProduct = data.product_detail;

  const relatedProducts = data.related_products;

  return (
    <React.Fragment>
      <MainDetail product={loadedProduct} />
      <LongDescription product={loadedProduct} />
      <RelatedProducts relatedProducts={relatedProducts} />
    </React.Fragment>
  );
}

export default DetailPage;

export const loader = async function ({ params }) {
  const res = await fetch(
    "https://apple-store-server-0biu.onrender.com/products/product-detail/" +
      params.productId
  );

  const data = await res.json();
  console.log("detail", data);
  return data;
};
