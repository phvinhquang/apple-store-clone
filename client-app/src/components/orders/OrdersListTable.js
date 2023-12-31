import React, { useState, useEffect, useCallback } from "react";
import classes from "./OrdersListTable.module.css";
import LoadingIndicator from "../../UI/LoadingIndicator";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../../util/token";

const OrdersListTable = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [httpEror, setHttpError] = useState(null);
  const [orders, setOrders] = useState(null);

  const token = getToken();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  // Hàm fetch order data
  const fetchOrders = useCallback(async function () {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://apple-store-server-0biu.onrender.com/products/orders",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await res.json();

      // Check lỗi
      if (!res.ok && !data.message) {
        throw new Error("Không lấy được dữ liệu đơn hàng");
      } else if (!res.ok && data.message) {
        throw new Error(data.message);
      }

      setOrders(data);
    } catch (err) {
      setHttpError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <React.Fragment>
      {/* {isLoading && <p>Đang tải order của bạn</p>} */}
      {isLoading && <LoadingIndicator />}
      {isLoggedIn && httpEror && <p>{httpEror}</p>}
      {!isLoggedIn && <p>Hãy đăng nhập để xem đơn hàng của bạn</p>}

      {!isLoading && !httpEror && (
        <table cellSpacing="0" className={classes.table}>
          <thead>
            <tr>
              <td>ID ORDER</td>
              <td>ID USER</td>
              <td>NAME</td>
              <td>PHONE</td>
              <td>ADDRESS</td>
              <td>TOTAL</td>
              <td>DELIVERY</td>
              <td>STATUS</td>
              <td>DETAIL</td>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td className={classes.id}>{order._id}</td>
                  <td className={classes.id}>{order.userId}</td>
                  <td>{order.orderer.fullname.split(" ").slice(-1)[0]}</td>
                  <td>{order.orderer.phone}</td>
                  <td className={classes.address}>{order.orderer.address}</td>
                  <td>{order.products.totalAmount.toLocaleString("de-DE")}đ</td>
                  <td>Wating </td>
                  <td className={classes.long}>Wating for payment</td>
                  <td>
                    <Link to={`/orders/${order._id}`} className={classes.btn}>
                      <span>View</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default OrdersListTable;
