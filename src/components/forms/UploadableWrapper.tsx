"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { toggleDim } from "@/app/redux/slices/dimSlice";
type UploadableWrapperProps = {
  children: React.ReactNode;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const { children } = props;
  const dispatch = useDispatch();
  const postThumbnails = useAppSelector(
    (state) => state.postReducer.thumbnails,
  );
  const [localDim, setLocalDim] = useState<boolean>(false);
  const handleUpload = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file[0]);
      reader.onload = () =>
        dispatch(
          setPostField({
            thumbnails: [...postThumbnails, reader.result as string],
          }),
        );
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        console.log("onDrag");
        dispatch(toggleDim());
      }}
      onDrop={(e) => {
        e.preventDefault();
        dispatch(toggleDim());
        console.log("onDrop");
      }}
      className="mix-h-screen relative w-full"
    >
      <div className="dragged absolute min-h-screen w-full"></div>

      {children}
    </div>
  );
};

export default UploadableWrapper;
