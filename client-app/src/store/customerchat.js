import { createSlice } from "@reduxjs/toolkit";

const initialCustomerChatState = { isShown: false };

const customerChatSlice = createSlice({
  name: "customer chat",
  initialState: initialCustomerChatState,
  reducers: {
    toggleChatPopUp(state) {
      state.isShown = !state.isShown;
    },
  },
});

export const customerChatActions = customerChatSlice.actions;

export default customerChatSlice;
