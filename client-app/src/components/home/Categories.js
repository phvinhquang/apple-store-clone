import React from "react";
import classes from "./Catergories.module.css";
import { Link } from "react-router-dom";

function Catergories({ imgs }) {
  return (
    <React.Fragment>
      <div className={classes.text}>
        <h3>CAREFULLY CREATED COLLECTIONS</h3>
        <h1>BROWSE OUR CATEGORIES</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.flex}>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`https://apple-store-server-0biu.onrender.com/${
                  imgs[0] || ""
                }`}
                alt="categories"
              />
            </Link>
          </div>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`https://apple-store-server-0biu.onrender.com/${
                  imgs[1] || ""
                }`}
                alt="categories"
              />
            </Link>
          </div>
        </div>
        <div className={classes.flex}>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`https://apple-store-server-0biu.onrender.com/${imgs[2]}`}
                alt="categories"
              />
            </Link>
          </div>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`https://apple-store-server-0biu.onrender.com/${imgs[3]}`}
                alt="categories"
              />
            </Link>
          </div>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`https://apple-store-server-0biu.onrender.com/${imgs[4]}`}
                alt="categories"
              />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Catergories;
