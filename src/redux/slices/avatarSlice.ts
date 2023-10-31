import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AvatarState = {
  avatar: string | undefined;
};
const initialState = {
  avatar: undefined,
} as AvatarState;
export const avatar = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      return {
        avatar: action.payload,
      };
    },
  },
});

export const { setAvatar } = avatar.actions;
export default avatar.reducer;
