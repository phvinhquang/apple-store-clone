import React, { Suspense } from "react";
import ShopBanner from "../components/shop/ShopBanner";
import ShopMain from "../components/shop/ShopMain";
import LoadingIndicator from "../UI/LoadingIndicator";

import { useLoaderData, defer, Await } from "react-router-dom";

function ShopPage() {
  const { shop } = useLoaderData();

  return (
    <React.Fragment>
      <ShopBanner />

      <Suspense fallback={<LoadingIndicator />}>
        <Await resolve={shop}>
          {(products) => {
            return <ShopMain products={products} />;
          }}
        </Await>
      </Suspense>
    </React.Fragment>
  );
}

export default ShopPage;

async function loadShop() {
  const res = await fetch(
    "https://apple-store-server-0biu.onrender.com/products/all"
  );

  const data = await res.json();
  return data;
}

export const loader = function () {
  return defer({
    shop: loadShop(),
  });
};
