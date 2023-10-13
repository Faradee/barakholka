import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DimState = {
  isDimmed: boolean;
};
const initialState = {
  isDimmed: false,
} as DimState;
export const dim = createSlice({
  name: "dim",
  initialState,
  reducers: {
    toggleDim: (state) => {
      return {
        isDimmed: !state.isDimmed,
      };
    },
    setDim: (state, action: PayloadAction<boolean>) => {
      return {
        isDimmed: action.payload,
      };
    },
  },
});

export const { toggleDim, setDim } = dim.actions;
export default dim.reducer;
