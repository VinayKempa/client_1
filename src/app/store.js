import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginManagement/loginSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
