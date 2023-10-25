import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingState = {
  loading: boolean;
};
const initialState = {
  loading: false,
} as LoadingState;
export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      return {
        loading: !state.loading,
      };
    },
  },
});

export const { toggleLoading } = loading.actions;
export default loading.reducer;
