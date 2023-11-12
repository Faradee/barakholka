"use client";
import { useAppSelector } from "@/redux/store";
import styles from "./styles.module.css";
import { store } from "@/redux/store";
import { toggleLoading } from "@/redux/slices/loadingSlice";

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
      {loading && (
        <div
          className={
            styles.loader +
            " absolute z-50 flex h-full w-full items-center justify-center"
          }
        >
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default LoaderWrapper;
