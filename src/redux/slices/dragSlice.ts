import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DragState = {
  dragAllow: boolean;
};
const initialState = {
  dragAllow: true,
} as DragState;
export const drag = createSlice({
  name: "drag",
  initialState,
  reducers: {
    setDrag: (state, action: PayloadAction<boolean>) => {
      return {
        dragAllow: action.payload,
      };
    },
  },
});

export const { setDrag } = drag.actions;
export default drag.reducer;
