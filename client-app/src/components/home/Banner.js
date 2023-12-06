import React from "react";
import classes from "./Banner.module.css";
import img from "../../images/banner1.jpg";

import { Link } from "react-router-dom";

function Banner({ img }) {
  return (
    <div className={classes["banner-container"]}>
      <img src={`http://localhost:5000/${img}`} alt="banner" />

      <div className={classes["banner-info"]}>
        <h3>NEW INSPIRATION 2023</h3>
        <h1>
          20% OFF ON NEW <br /> SEASON
        </h1>
        <Link to="/shop">
          <button className={classes.button}>Browse collections</button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
