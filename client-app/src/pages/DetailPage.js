import React, { Suspense } from "react";

import MainDetail from "../components/detail/MainDetail";
import LongDescription from "../components/detail/LongDescription";
import RelatedProducts from "../components/detail/RelatedProducts";
import LoadingIndicator from "../UI/LoadingIndicator";

import { useLoaderData, Await, defer } from "react-router-dom";
// import { useParams } from "react-router-dom";

function DetailPage() {
  const { detail } = useLoaderData();

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingIndicator />}>
        <Await resolve={detail}>
          {(detail) => {
            return (
              <>
                <MainDetail product={detail.product_detail} />
                <LongDescription product={detail.product_detail} />
              </>
            );
          }}
        </Await>
      </Suspense>

      <Suspense fallback={<LoadingIndicator />}>
        <Await resolve={detail}>
          {(detail) => {
            return (
              <RelatedProducts relatedProducts={detail.related_products} />
            );
          }}
        </Await>
      </Suspense>
    </React.Fragment>
  );
}

export default DetailPage;

async function loadDetail(params) {
  const res = await fetch(
    "https://apple-store-server-0biu.onrender.com/products/product-detail/" +
      params.productId
  );

  const data = await res.json();
  // console.log("detail", data);
  return data;
}

export const loader = function ({ params }) {
  return defer({
    detail: loadDetail(params),
  });
};
