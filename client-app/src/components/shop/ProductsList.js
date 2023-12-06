import React from "react";
import classes from "./ProductsList.module.css";
import { Link } from "react-router-dom";

const ProductsList = function (props) {
  return (
    <div className={classes["products-list"]}>
      <div className={classes["search-filter"]}>
        <input type="text" placeholder="Enter Search Here" />
        <div className={classes.dropdown}>
          <select name="types" id="types">
            <option>Default Sorting</option>
            <option value="iphone">Iphone</option>
            <option value="ipad">Ipad</option>
            <option value="macbook">Macbook</option>
            <option value="airpod">Airpod</option>
          </select>
        </div>
      </div>

      <div className={classes.grid}>
        {props.products.map((product) => (
          <div key={product.name} className={classes.product}>
            <Link to={`/detail/${product._id}`}>
              <div>
                <img src={product.img1} />
              </div>
              <div>
                <h3>{product.name}</h3>
                <h4>{Number(product.price).toLocaleString("de-DE")} VND</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className={classes.nav}>
        <ul className={classes["page-nav"]}>
          <li>
            <i className="fa-solid fa-angles-left"></i>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <i className="fa-solid fa-angles-right"></i>
          </li>
        </ul>

        <p>{`Showing 1-${props.products.length} of ${props.products.length} results`}</p>
      </div>
    </div>
  );
};

export default ProductsList;
