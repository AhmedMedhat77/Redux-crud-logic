import { configureStore } from "@reduxjs/toolkit";
import UsesrSlice from "../Slices/UserSlice";

const Store = configureStore({
  reducer: {
    users: UsesrSlice,
  },
});

export default Store;
