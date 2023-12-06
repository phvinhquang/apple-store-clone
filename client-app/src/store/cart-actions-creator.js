import { cartActions } from "./cart";

export function updateCart(cart) {
  return async function (dispatch) {
    const sendUpdateCartRequest = async function () {
      const res = await fetch("http://localhost:5000/products/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
        credentials: "include",
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
        credentials: "include",
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
