"use client";
import { useAppSelector } from "@/redux/store";
import { store } from "@/redux/store";
import { toggleLoading } from "@/redux/slices/loadingSlice";
import Loader from "./Loader";

export const loadResource = async (callback: Promise<void>) => {
  store.dispatch(toggleLoading());
  await callback;
  store.dispatch(toggleLoading());
};
const LoaderWrapper = ({ children }: { children: JSX.Element }) => {
  const loading = useAppSelector((state) => state.loading.loading);
  return (
    <div
      className={`${loading ? "pointer-events-none opacity-50" : ""} relative `}
    >
      {loading && <Loader />}

      {children}
    </div>
  );
};

export default LoaderWrapper;
