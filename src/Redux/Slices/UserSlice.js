import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selected: null,
  filter: [],
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...state, ...(action.payload ?? {}) };
    },
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action) => {},
  },
});

export const user_actions = UsersSlice.actions;
export const { addUser, deleteUser, editUser } = UsersSlice.actions;
export default UsersSlice.reducer;
