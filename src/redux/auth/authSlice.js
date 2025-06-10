import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: localStorage.getItem("isAuth") === "true",
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state) {
      state.error = null;
      state.auth = true;
    },
    clearAuth(state) {
      console.log("clear");
      state.auth = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setAuth, clearAuth, setError } = authSlice.actions;
