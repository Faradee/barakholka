import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dimReducer from "./slices/dimSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import dragReducer from "./slices/dragSlice";
import thumbnailReducer from "./slices/thumbnailSlice";
export const store = configureStore({
  reducer: {
    dimReducer,
    authReducer,
    postReducer,
    thumbnailReducer,
    dragReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
