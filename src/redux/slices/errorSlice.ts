import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorState = {
  error: string | null;
};
const initialState = {
  error: null,
} as ErrorState;
export const error = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      return {
        error: action.payload,
      };
    },
  },
});

export const { setError } = error.actions;
export default error.reducer;
