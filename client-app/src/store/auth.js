import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false, user: "" };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logOut(state) {
      state.isAuthenticated = false;
      state.user = "";
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiryDate");
      localStorage.removeItem("userId");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
