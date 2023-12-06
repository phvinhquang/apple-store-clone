import React from "react";
import classes from "./CartList.module.css";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart";

const CartList = function () {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);

  const decreaseQuantityHandler = function (product) {
    dispatch(cartActions.dereaseQuantityFromCart(product.id));
    console.log(products);
  };

  const increaseQuantityHandler = function (product) {
    console.log(product);
    dispatch(
      cartActions.addToCart({
        ...product,
        amount: 1,
      })
    );
  };

  const removeFromCartHandler = function (id) {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <React.Fragment>
      <div className={classes.cartlist}>
        <div className={classes.products}>
          {products.length > 0 && (
            <div className={classes.titles}>
              <h4>IMAGE</h4>
              <h4>PRODUCT</h4>
              <h4>PRICE</h4>
              <h4>QUANTITY</h4>
              <h4>TOTAL</h4>
              <h4>REMOVE</h4>
            </div>
          )}
          {products.length === 0 && (
            <p>Nothing here yet. Please add some products to cart</p>
          )}

          <div className={classes.products}>
            {products.map((product) => (
              <div key={product.id} className={classes.product}>
                <div className={classes.img}>
                  <img src={product.img} alt={product.name} />
                </div>
                <h3 className={classes.name}>{product.name}</h3>
                <h5 className={classes.price}>
                  {Number(product.price).toLocaleString("de-DE")} VND
                </h5>
                <div className={classes.number}>
                  <i
                    onClick={decreaseQuantityHandler.bind(null, product)}
                    className="fa-solid fa-caret-left"
                  ></i>
                  <span>{product.amount}</span>
                  <i
                    onClick={increaseQuantityHandler.bind(null, product)}
                    className="fa-solid fa-caret-right"
                  ></i>
                </div>
                <h5 className={classes.price}>
                  {Number(product.price * product.amount).toLocaleString(
                    "de-DE"
                  )}{" "}
                  VND
                </h5>
                <button onClick={removeFromCartHandler.bind(null, product.id)}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>

          {products.length > 0 && (
            <div className={classes["other-actions"]}>
              <Link to="/shop">
                <i className="fa-solid fa-arrow-left-long"></i>
                <span>Continue shopping</span>
              </Link>
              <Link to="/checkout">
                <span>Procced to checkout </span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartList;
