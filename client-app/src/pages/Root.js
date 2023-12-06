import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import ScrollToTop from "../UI/ScrollToTop";
import LiveChatIcon from "../components/livechat/LiveChatIcon";
import ChatPopUp from "../components/livechat/ChatPopUp";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, fetchCart } from "../store/cart-actions-creator";

let isFirstTime = true;

function RootLayout() {
  const dispatch = useDispatch();
  const isShown = useSelector((state) => state.customerChat.isShown);
  const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, [dispatch, cart.changed]);

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;
      return;
    }

    const uploadItems = cart.items.map((item) => {
      return { productId: item.id, amount: item.amount };
    });

    if (cart.changed) {
      dispatch(
        updateCart({ items: uploadItems, totalAmount: cart.totalAmount })
      );
    }
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Outlet />
        <ScrollToTop />
        {isShown && <ChatPopUp />}
        <LiveChatIcon />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default RootLayout;
