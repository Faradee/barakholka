import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
type PostState = {
  posterId: string;
  title: string;
  type: "car" | "estate" | "misc";
  description: string;
  price: string;
  details?: CarState | EstateState;
};
type InitialState = PostState;
type PostData = {
  [P in keyof PostState]?: PostState[P];
};
type KeysOfUnion<T> = T extends T ? keyof T : never;
type DetailTypes = CarState | EstateState;
type DetailsData = {
  [Property in KeysOfUnion<DetailTypes>]?: string | boolean;
};
const initialState = {
  posterId: "",
  title: "",
  type: "car",
  description: "",
  price: "",
  details: {
    kilometrage: "",
    year: "",
    transmission: "",
    brand: "",
    model: "",
    color: "",
    horsepower: "",
    damaged: false,
    trade: false,
  } as CarState,
} as InitialState;
export const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    SetPostData: (state: PostState, action: PayloadAction<PostState>) => {
      return { ...action.payload };
    },
    setPostField: (state: PostState, action: PayloadAction<PostData>) => {
      return { ...state, ...action.payload };
    },
    setDetailsField: (state: PostState, action: PayloadAction<DetailsData>) => {
      return {
        ...state,
        details: { ...state.details, ...action.payload },
      } as PostState;
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
  SetPostData,
} = post.actions;
export default post.reducer;
