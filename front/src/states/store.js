import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import users from "./users";

const store = configureStore({
  reducer: {
    user: user,
    users: users,
  },
});

export default store;
