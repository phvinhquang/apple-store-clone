import React from "react";
import classes from "./AdditionalInfo.module.css";

const AdditionalInfo = function () {
  return (
    <React.Fragment>
      <div className={classes.service}>
        <div className={classes["service-item"]}>
          <h1>FREE SHIPPING</h1>
          <h3>Free shipping worldwide</h3>
        </div>
        <div className={classes["service-item"]}>
          <h1>24 X 7 SERVICE</h1>
          <h3>Free shipping worldwide</h3>
        </div>
        <div className={classes["service-item"]}>
          <h1>FESTIVAL OFFER</h1>
          <h3>Free shipping worldwide</h3>
        </div>
      </div>
      <div className={classes.subscribe}>
        <div className={classes.text}>
          <h1>LET'S BE FRIENDS!</h1>
          <h3>Nisi nisi tempor consequat laboris nisi.</h3>
        </div>
        <div className={classes["subs-input"]}>
          <input type="text" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdditionalInfo;
