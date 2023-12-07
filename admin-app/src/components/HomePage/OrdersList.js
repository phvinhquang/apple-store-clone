import classes from "./OrdersList.module.css";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { serverUrl } from "../../utils/auth";
import { getToken } from "../../utils/auth";

import Card from "../../UI/Card";
import Table from "../../UI/Table";

const OrdersList = function ({ title }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = serverUrl;
  const token = getToken();

  // Hàm fetch transaction của người dùng
  const fetchOrders = useCallback(async function () {
    setIsLoading(true);

    try {
      const res = await fetch(`${url}admin/orders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();

      setOrders(data.result);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  //Thay đổi format cho date
  // const convertDate = function (data) {
  //   const result = new Date(data);

  //   return format(result, "dd/MM/yyyy");
  // };

  // Hiển thị và set className cho status
  // const setStatus = function (dateStartData, dateEndData) {
  //   const today = new Date();
  //   const dateStart = new Date(dateStartData);
  //   const dateEnd = new Date(dateEndData);

  //   let text = "Booked";
  //   if (today < dateStart) {
  //     text = "Booked";
  //   }

  //   if (today.getDate() === dateStart.getDate()) {
  //     text = "Checkin";
  //   }

  //   if (today > dateEnd) {
  //     text = "Checkout";
  //   }

  //   return text;
  // };

  return (
    <Card className={classes["transactions-card"]}>
      <div className={classes.container}>
        <h2>{title}</h2>
        {isLoading && <p className={classes.loading}>Loading orders ...</p>}
        {!isLoading && (
          <Table
            // className={classes.table}
            resultsPerPage={orders && orders.length}
            totalPage="1"
          >
            <thead>
              <tr>
                <th>
                  <p>ID User</p>
                </th>
                <th>
                  <p>Name</p>
                </th>
                <th>
                  <p>Phone</p>
                </th>
                <th>
                  <p>Address</p>
                </th>
                <th>
                  <p>Total</p>
                </th>
                <th>
                  <p>Deliverry</p>
                </th>
                <th
                //  className={classes["payment-column"]}
                >
                  <p>Status</p>
                </th>
                <th>
                  <p>Detail</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.userId}</td>
                    <td>{order.orderer.fullname}</td>
                    <td>{order.orderer.phone}</td>
                    <td>{order.orderer.address}</td>
                    <td>
                      {order.products.totalAmount.toLocaleString("de-DE")} đ
                    </td>
                    <td>Chưa vận chuyển</td>
                    <td>Chưa thanh toán</td>
                    <td>
                      <button type="button" className={classes["btn-new"]}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </Card>
  );
};

export default OrdersList;
