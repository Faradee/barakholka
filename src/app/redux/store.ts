import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dimReducer from "./slices/dimSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import dragReducer from "./slices/dragSlice";
import thumbnailReducer from "./slices/thumbnailSlice";
import errorReducer from "./slices/errorSlice";
import loadingReducer from "./slices/loadingSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const rootReducer = combineReducers({
  dimReducer,
  authReducer,
  postReducer,
  thumbnailReducer,
  dragReducer,
  errorReducer,
  loadingReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
