import React from "react";
import OrdersPageBanner from "../components/orders/OrdersPageBanner";
import OrdersListTable from "../components/orders/OrdersListTable";

const OrdersPage = function () {
  return (
    <React.Fragment>
      <OrdersPageBanner />
      <OrdersListTable />
    </React.Fragment>
  );
};

export default OrdersPage;
