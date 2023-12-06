import { configureStore } from "@reduxjs/toolkit";

import popUpSlice from "./popup";
import authSlice from "./auth";
import quantitySlice from "./quatity";
import cartSlice from "./cart";
import customerChatSlice from "./customerchat";

// const popUpReducer = function (state = initialPopUpState, action) {
//   if (action.type === "SHOW_POPUP") {
//     return { isShown: true };
//   }

//   if (action.type === "HIDE_POPUP") {
//     return { isShown: false };
//   }

//   return state;
// };

const store = configureStore({
  reducer: {
    popup: popUpSlice.reducer,
    auth: authSlice.reducer,
    quantity: quantitySlice.reducer,
    cart: cartSlice.reducer,
    customerChat: customerChatSlice.reducer,
  },
});

export default store;
