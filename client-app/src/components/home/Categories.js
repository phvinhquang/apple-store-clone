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
                src={`http://localhost:5000/${imgs[0]}`}
                alt="categories image"
              />
            </Link>
          </div>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`http://localhost:5000/${imgs[1]}`}
                alt="categories image"
              />
            </Link>
          </div>
        </div>
        <div className={classes.flex}>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`http://localhost:5000/${imgs[2]}`}
                alt="categories image"
              />
            </Link>
          </div>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`http://localhost:5000/${imgs[3]}`}
                alt="categories image"
              />
            </Link>
          </div>
          <div className={classes["cat-item"]}>
            <Link to="/shop">
              <img
                src={`http://localhost:5000/${imgs[4]}`}
                alt="categories image"
              />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Catergories;
