import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  uuid: string;
};
type UserInfo = Omit<UserState, "uuid">;
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
    setUserData: (state, action: PayloadAction<UserInfo>) => {
      return { uuid: state.uuid, ...action.payload };
    },
  },
});

export const { signIn, signOut, setUserData } = auth.actions;
export default auth.reducer;
