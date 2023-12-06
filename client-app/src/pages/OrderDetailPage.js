import React, { useEffect, useCallback, useState } from "react";
import OrderDetailInfo from "../components/orders/OrderDetailInfo";
import OrderDetailProducts from "../components/orders/OrderDetailProducts";
import { useParams } from "react-router-dom";

const OrderDetailPage = function () {
  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpEror, setHttpError] = useState(null);
  const { orderId } = useParams();

  // Hàm fetch order detail
  const fetchOrderDetail = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await fetch(
          "http://localhost:5000/products/orders/" + orderId,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        // Check lỗi
        if (!res.ok && !data.message) {
          throw new Error("Không lấy được dữ liệu đơn hàng");
        } else if (!res.ok && data.message) {
          throw new Error(data.message);
        }

        console.log(data);
        setOrderDetail(data);
      } catch (err) {
        setHttpError(err.message);
      }
      setIsLoading(false);
    },
    [orderId]
  );

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

  return (
    <React.Fragment>
      {isLoading && <p>Đang tải thông tin đơn hàng</p>}
      {!isLoading && <OrderDetailInfo order={orderDetail} />}
      {!isLoading && (
        <OrderDetailProducts products={orderDetail && orderDetail.products} />
      )}
    </React.Fragment>
  );
};

export default OrderDetailPage;
