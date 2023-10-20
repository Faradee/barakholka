"use client";
import { useAppSelector } from "@/app/redux/store";
import Image from "next/image";
import loadingIcon from "../../public/1544764567.svg";
import { store } from "@/app/redux/store";
import { toggleLoading } from "@/app/redux/slices/loadingSlice";
export const loadResource = async (callback: Promise<void>) => {
  store.dispatch(toggleLoading());
  await callback;
  store.dispatch(toggleLoading());
};
const Loading = () => {
  const isLoading = useAppSelector((state) => state.loadingReducer.loading);
  return (
    <>
      {isLoading && (
        <div className="fixed z-40 flex h-full w-full items-center justify-center overflow-hidden bg-black opacity-70">
          <Image src={loadingIcon} alt="loading..." className="loading" />
        </div>
      )}
    </>
  );
};

export default Loading;
