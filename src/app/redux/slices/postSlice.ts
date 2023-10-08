import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { PostState } from "@/components/postEditor/PostEditor";

const initialState = {
  title: "",
  type: "car",
  description: "",
  price: "0",
  details: {
    kilometrage: "0",
    year: "0",
    transmission: "",
    brand: "",
    model: "",
    color: "",
    engine: "",
    damaged: false,
  } as CarState,
} as PostState;

export const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<PostState>) => {
      return action.payload;
    },
    resetPostData: () => {
      return initialState;
    },
  },
});

export const { setPostData, resetPostData } = post.actions;
export default post.reducer;
