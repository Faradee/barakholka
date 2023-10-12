"use client";
import React, { useState } from "react";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useAppSelector } from "@/app/redux/store";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
type UploadableWrapperProps = {
  children: React.ReactNode;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const { children } = props;
  const dispatch = useDispatch();
  const [localDim, setLocalDim] = useState<boolean>(false);
  const postThumbnails = useAppSelector(
    (state) => state.postReducer.thumbnails,
  );
  const handleUpload = (e: React.DragEvent) => {
    const reader = new FileReader();
    console.log(e.dataTransfer.items);
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const file = e.dataTransfer.items[i];
        if (file.kind === "file" && file.type.match("^image/")) {
          const image = file.getAsFile();
          reader.readAsDataURL(image as Blob);
          reader.onload = () =>
            dispatch(
              setPostField({
                thumbnails: [...postThumbnails, reader.result as string],
              }),
            );
        }
      }
    }
  };

  return (
    <div className="relative w-full">
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          console.log("onDrag");
          setLocalDim(true);
        }}
        onDragLeave={(e) => {
          console.log("poop");
          e.preventDefault();
          setLocalDim(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setLocalDim(false);
          handleUpload(e);
          console.log("onDrop");
        }}
        className="absolute z-30 hidden h-full w-full items-center justify-center bg-black text-white opacity-0"
        style={localDim ? { opacity: "0.7", display: "flex" } : {}}
      >
        {" "}
        {localDim && (
          <div className="pointer-events-none flex translate-y-[-25%] flex-col items-center justify-center">
            <AiOutlineCloudUpload size={"xl"} />
            Отпустите чтобы загрузить файл
          </div>
        )}
      </div>
      <div onDragEnter={() => setLocalDim(true)}>{children}</div>
    </div>
  );
};

export default UploadableWrapper;
