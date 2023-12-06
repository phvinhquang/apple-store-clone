import React, { useEffect } from "react";

import CartBanner from "../components/cart/CartBanner";
import CartMain from "../components/cart/CartMain";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, fetchCart } from "../store/cart-actions-creator";

const CartPage = function () {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, cart.changed]);

  return (
    <React.Fragment>
      <CartBanner />
      <CartMain />
    </React.Fragment>
  );
};

export default CartPage;
