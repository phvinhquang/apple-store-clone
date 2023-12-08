import { cartActions } from "./cart";
import { getToken } from "../util/token";

export function updateCart(cart) {
  return async function (dispatch) {
    const sendUpdateCartRequest = async function () {
      const res = await fetch("http://localhost:5000/products/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(cart),
      });

      if (!res.ok) {
        throw new Error("Cập nhật giỏ hàng không thành công !");
      }

      const data = await res.json();
      console.log("data update cart", data);
    };

    try {
      await sendUpdateCartRequest();
    } catch (err) {
      /////////
    }
  };
}

export function fetchCart() {
  return async function (dispatch) {
    const fetchCartData = async function () {
      const res = await fetch("http://localhost:5000/products/cart", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      const data = await res.json();
      if (!res.ok && !data.message) {
        throw new Error("Không lấy được dữ liệu giỏ hàng");
      } else if (!res.ok && data.message) {
        console.log(data.message);
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const cartData = await fetchCartData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (err) {
      ////
    }
  };
}
