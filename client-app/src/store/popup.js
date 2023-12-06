import { createSlice } from "@reduxjs/toolkit";

const initialPopUpState = { isShown: false };

const popUpSlice = createSlice({
  name: "popup",
  initialState: initialPopUpState,
  reducers: {
    showPopUp(state) {
      state.isShown = true;
    },
    hidePopUp(state) {
      state.isShown = false;
    },
  },
});

export const popUpActions = popUpSlice.actions;

export default popUpSlice;
