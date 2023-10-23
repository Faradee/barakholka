import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  uuid: string;
};
const initialState = {
  name: "",
  email: "",
  uuid: "",
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
