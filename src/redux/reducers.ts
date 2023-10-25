import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dimReducer from "./slices/dimSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import dragReducer from "./slices/dragSlice";
import thumbnailReducer from "./slices/thumbnailSlice";
import errorReducer from "./slices/errorSlice";
import loadingReducer from "./slices/loadingSlice";

export const rootReducer = combineReducers({
  dim: dimReducer,
  post: postReducer,
  thumbnail: thumbnailReducer,
  drag: dragReducer,
  error: errorReducer,
  loading: loadingReducer,
  auth: authReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
