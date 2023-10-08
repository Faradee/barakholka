import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
type PostState = {
  posterId: string;
  title: string;
  type: "car" | "estate" | "misc";
  description: string;
  price: string;
  details: CarState | EstateState;
};
type InitialState = PostState;
type PostData = {
  [Property in keyof PostState]?: PostState[Property];
};
const initialState = {
  posterId: "",
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
} as InitialState;

export const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostField: (state: PostState, action: PayloadAction<PostData>) => {
      return { ...state, ...action.payload };
    },
    setDetailsField: (
      state: PostState,
      action: PayloadAction<CarState | EstateState>,
    ) => {
      return { ...state, details: { ...state.details, ...action.payload } };
    },
    resetPostData: () => {
      return initialState;
    },
    resetDetailsData: () => {
      return { ...initialState, details: initialState.details };
    },
  },
});

export const {
  setPostField,
  setDetailsField,
  resetPostData,
  resetDetailsData,
} = post.actions;
export default post.reducer;
