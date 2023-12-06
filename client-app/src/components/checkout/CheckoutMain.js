import React, { useEffect } from "react";
import classes from "./CheckoutMain.module.css";
import CheckoutForm from "./CheckoutForm";
import CheckoutDetail from "./CheckoutDetail";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutMain = function () {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <React.Fragment>
      <h2 className={classes.title}>BILLING DETAILS</h2>
      {isLoggedIn && (
        <div className={classes.flexbox}>
          <CheckoutForm />
          <CheckoutDetail />
        </div>
      )}
    </React.Fragment>
  );
};

export default CheckoutMain;
