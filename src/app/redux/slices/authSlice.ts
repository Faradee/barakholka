import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  uuid: string;
};

type InitialState = {
  value: UserState;
};

const initialState = {
  value: {
    name: "",
    email: "",
    uuid: "",
  } as UserState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => {
      return initialState;
    },
    signIn: (state, action: PayloadAction<UserState>) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { signIn, signOut } = auth.actions;
export default auth.reducer;
