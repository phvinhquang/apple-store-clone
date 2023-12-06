import { createSlice } from "@reduxjs/toolkit";

// const cartData = JSON.parse(localStorage.getItem("cart")) ?? {
//   items: [],
//   totalAmount: 0,
// };

const initialCartState = {
  items: [],
  totalAmount: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    addToCart(state, action) {
      let updatedItems;

      //Tính tổng tiền mới
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      //Kiểm tra item được add đã có trong cart chưa
      // Tìm index
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      //Tìm item theo index tìm được
      const existingCartItem = state.items[existingCartItemIndex];

      //Nếu item đã có trong cart
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          //Cập nhật amount, giữ nguyên các prop khác
          amount: existingCartItem.amount + action.payload.amount,
        };

        //Cập nhật lại item đó trong cart
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        //Nếu item chưa có trong cart thì thêm mới
        updatedItems = state.items.concat(action.payload);
      }

      //Lưu local storage
      const updatedCart = {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

      // SẼ XÓA
      // localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        changed: true,
      };
    },

    dereaseQuantityFromCart(state, action) {
      let updatedItems;
      //Tìm index của item
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      // Tìm item
      const existingCartItem = state.items[existingCartItemIndex];
      // //Cập nhật tổng tiền
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      // Nếu amount hiện tại = 1 thì xóa khỏi cart
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
        console.log(updatedItems);
      } else {
        //Nếu số lượng lớn hơn 1 thì giảm đi 1
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };

        //Cập nhật lại cart
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      //Lưu local storage
      // const updatedCart = {
      //   items: updatedItems,
      //   totalAmount: updatedTotalAmount,
      // };
      // localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        changed: true,
      };
    },

    removeFromCart(state, action) {
      let updatedItems;

      const existingCartItemIndex = state.items.findIndex(
        (product) => product.id === action.payload
      );
      const existingCartItem = state.items[existingCartItemIndex];

      const updatedTotalAmount =
        state.totalAmount - existingCartItem.price * existingCartItem.amount;

      updatedItems = state.items.filter(
        (product) => product.id !== action.payload
      );

      //Lưu local storage
      // const updatedCart = {
      //   items: updatedItems,
      //   totalAmount: updatedTotalAmount,
      // };

      // localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        changed: true,
      };
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
