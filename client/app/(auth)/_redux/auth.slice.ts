import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.data.access;
      state.isLogin = true;
    },
  },
});

export default authSlice.reducer;
export const { login } = authSlice.actions;
