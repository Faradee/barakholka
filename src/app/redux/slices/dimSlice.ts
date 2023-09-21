import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dimState = {
  value: {
    isDimmed: boolean;
  };
};
const initialState = {
  value: {
    isDimmed: false,
  },
} as dimState;
export const dim = createSlice({
  name: "slice",
  initialState,
  reducers: {
    toggleDim: (state) => {
      return {
        value: {
          isDimmed: !state.value.isDimmed,
        },
      };
    },
  },
});

export const { toggleDim } = dim.actions;
export default dim.reducer;
