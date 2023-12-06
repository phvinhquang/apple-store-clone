import React, { useEffect, useState } from "react";
import classes from "./MainDetail.module.css";

import { useSelector, useDispatch } from "react-redux";
import { quantityActions } from "../../store/quatity";
import { cartActions } from "../../store/cart";

const MainDetail = function ({ product }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantity.number);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const cart = useSelector((state) => state.cart.items);
  const [addToCartError, setAddToCartError] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (addingToCart) {
      const timer = setTimeout(() => {
        setAddingToCart(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [addingToCart]);

  const decreaseQuantityHandler = function () {
    dispatch(quantityActions.decrease());
  };

  const increaseQuantityHandler = function () {
    dispatch(quantityActions.increase());
  };

  const addToCartHandler = function () {
    if (!isLoggedIn) {
      setAddToCartError(true);
      return;
    }
    setAddingToCart(true);

    dispatch(
      cartActions.addToCart({
        img: product.img1,
        id: product._id,
        name: product.name,
        price: Number(product.price),
        amount: quantity,
      })
    );
  };

  return (
    <React.Fragment>
      {product && (
        <div className={classes["detail-main"]}>
          <div className={classes["images-container"]}>
            <div className={classes["image-side"]}>
              <img src={product.img1}></img>
            </div>
            <div className={classes["image-side"]}>
              <img src={product.img2}></img>
            </div>
            <div className={classes["image-side"]}>
              <img src={product.img3}></img>
            </div>
            <div className={classes["image-side"]}>
              <img src={product.img4}></img>
            </div>
            <div className={classes["image-main"]}>
              <img src={product.img1} />
            </div>
          </div>

          <div className={classes["short-description"]}>
            <h1>{product.name}</h1>
            <h3>{Number(product.price).toLocaleString("de-DE")} VND</h3>
            <p>{product.short_desc}</p>
            <h4>
              CATEGORY: <span>{product.category}s</span>
            </h4>
            <h4>
              STOCK:{" "}
              <span>
                {product.stock > 0 ? product.stock : "Sản phẩm đang tạm hết"}
              </span>
            </h4>
            <div className={classes.action}>
              <div className={classes.quantity}>
                <span>QUANTITY</span>
                <div className={classes.number}>
                  <i
                    onClick={decreaseQuantityHandler}
                    className="fa-solid fa-caret-left"
                  ></i>
                  <span>{quantity}</span>
                  <i
                    onClick={increaseQuantityHandler}
                    className="fa-solid fa-caret-right"
                  ></i>
                </div>
              </div>
              <button disabled={product.stock === 0} onClick={addToCartHandler}>
                Add to cart
              </button>
              {addingToCart && (
                <div className={classes["add-to-cart"]}>
                  Đã thêm vào giỏ hàng
                </div>
              )}
            </div>
            {addToCartError && (
              <p style={{ color: "red" }}>Bạn cần đăng nhập để thêm giỏ hàng</p>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MainDetail;
