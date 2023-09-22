import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  password: string;
};

type InitialState = {
  value: UserState;
};

const initialState = {
  value: {
    name: "",
    email: "",
    password: "",
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
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    },
  },
});

export const { signIn, signOut } = auth.actions;
export default auth.reducer;
