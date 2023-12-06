import { createSlice } from "@reduxjs/toolkit";

const initialQuantitySate = { number: 1 };

const quantitySlice = createSlice({
  name: "quantity",
  initialState: initialQuantitySate,
  reducers: {
    increase(state) {
      state.number++;
    },

    decrease(state) {
      if (state.number === 1) {
        state.number = 1;
      } else if (state.number > 1) {
        state.number--;
      }
    },
  },
});

export const quantityActions = quantitySlice.actions;

export default quantitySlice;
