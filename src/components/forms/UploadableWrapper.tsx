"use client";
import { useState } from "react";
import Uploadable from "./Uploadable";
import { useAppSelector } from "@/app/redux/store";

type UploadableWrapperProps = {
  children: React.ReactNode;
  addFile: (file: string) => void;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const { children, addFile } = props;
  const [localDim, setLocalDim] = useState<boolean>(false);
  const dragAllow = useAppSelector((state) => state.dragReducer.dragAllow);
  const handleUpload = (e: React.DragEvent) => {
    const reader = new FileReader();
    console.log(e.dataTransfer.items);
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const file = e.dataTransfer.items[i];
        if (file.kind === "file" && file.type.match("^image/")) {
          const image = file.getAsFile();
          reader.readAsDataURL(image as Blob);
          reader.onload = () => addFile(reader.result as string);
        }
      }
    }
  };

  return (
    <div className="h-full w-full" onDrop={(e) => e.preventDefault()}>
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setLocalDim(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setLocalDim(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLocalDim(false);
          handleUpload(e);
        }}
        className="absolute z-30 hidden h-full w-full select-none items-center justify-center bg-black text-white opacity-70"
        style={localDim ? { display: "flex" } : {}}
      >
        <Uploadable />
      </div>
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          if (dragAllow) setLocalDim(true);
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </div>
  );
};

export default UploadableWrapper;
