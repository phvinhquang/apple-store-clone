import classes from "./GerneralInfo.module.css";
import Card from "../../UI/Card";
import { useEffect, useState } from "react";
import { serverUrl } from "../../utils/auth";
import { getToken } from "../../utils/auth";

const GerneralInfo = function () {
  const [generalInfo, setGeneralInfo] = useState([]);
  const url = serverUrl;
  const token = getToken();

  //Hàm fetch thông tin chung
  const fetchGeneralInfo = async function () {
    try {
      const res = await fetch(`${url}admin/overall`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      setGeneralInfo(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchGeneralInfo();
  }, []);

  return (
    <div className={classes["overall-container"]}>
      <Card className={classes["card-item"]}>
        <div className={classes["overall-item"]}>
          <div>
            <h3>{generalInfo ? generalInfo.totalUsers : "Loading"}</h3>
            <p>Client(s)</p>
          </div>
          <div className={classes.icon}>
            <span className={classes["users-icon"]}>
              <i className="fa-solid fa-user-plus"></i>{" "}
            </span>
          </div>
        </div>
      </Card>

      <Card className={classes["card-item"]}>
        <div className={classes["overall-item"]}>
          <div>
            <h3>
              {generalInfo.totalSale
                ? generalInfo.totalSale.toLocaleString("de-DE")
                : "Loading"}
              VNĐ
            </h3>
            <p>Earning of month</p>
          </div>
          <div className={classes.icon}>
            <span className={classes["orders-icon"]}>
              <i className="fa-solid fa-dollar-sign"></i>{" "}
            </span>
          </div>
        </div>
      </Card>

      <Card className={classes["card-item"]}>
        <div className={classes["overall-item"]}>
          <div>
            <h3>{generalInfo ? generalInfo.new_orders : "Loading"}</h3>
            <p>New Order(s)</p>
          </div>
          <div className={classes.icon}>
            <span className={classes["earnings-icon"]}>
              <i className="fa-solid fa-file"></i>{" "}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GerneralInfo;
