import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";
// import userReducer from "./slices/userSlice"; // opcional se ainda usar

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    // user: userReducer,
  },
});

export default store;