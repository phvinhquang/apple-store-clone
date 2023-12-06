import React from "react";
import classes from "./CartMain.module.css";
import CartList from "./CartList";
import CartTotalAmout from "./CartTotalAmount";
import { useSelector } from "react-redux";

const CartMain = function () {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <React.Fragment>
      <h2 className={classes.title}>SHOPPING CART</h2>
      {isLoggedIn && (
        <div className={classes.flexbox}>
          <CartList />
          <CartTotalAmout />
        </div>
      )}
      {!isLoggedIn && <p>Hãy đăng nhập để xem giỏ hàng</p>}
    </React.Fragment>
  );
};

export default CartMain;
