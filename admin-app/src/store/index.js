import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false, email: null };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    logIn(state, action) {
      return { isAuthenticated: true, email: action.payload.email };
    },

    logOut(state) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("tokenExpiryDate");
      return { isAuthenticated: false, email: null };
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;

export default store;
