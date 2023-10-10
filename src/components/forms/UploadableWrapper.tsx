"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
type UploadableWrapperProps = {
  children: React.ReactNode;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const { children } = props;
  const dispatch = useDispatch();
  const postThumbnails = useAppSelector(
    (state) => state.postReducer.thumbnails,
  );
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
    <>
      <div className="absolute z-20 h-full w-full">
        <input name="thumbnail" onChange={(e) => handleUpload(e)} type="file" />
      </div>
      {children}
    </>
  );
};

export default UploadableWrapper;
