import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  uuid: string;
};
const initialState = {
  name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
  email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
  uuid: localStorage.getItem("uuid") ? localStorage.getItem("uuid") : "",
} as UserState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => {
      return initialState;
    },
    signIn: (state, action: PayloadAction<UserState>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { signIn, signOut } = auth.actions;
export default auth.reducer;
