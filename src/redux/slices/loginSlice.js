import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  escola: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.email;
      state.escola = action.payload.escola;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout } = loginSlice.actions;
export default loginSlice.reducer;