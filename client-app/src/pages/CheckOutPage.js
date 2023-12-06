import React from "react";
import CheckoutBanner from "../components/checkout/CheckoutBanner";
import CheckoutMain from "../components/checkout/CheckoutMain";

const CheckOutPage = function () {
  return (
    <React.Fragment>
      <CheckoutBanner />
      <CheckoutMain />
    </React.Fragment>
  );
};

export default CheckOutPage;
