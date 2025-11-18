import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.email;
      state.loading = false;
      state.success = true;
    },
    registerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearRegister: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { registerStart, registerSuccess, registerError, clearRegister } = registerSlice.actions;
export default registerSlice.reducer;