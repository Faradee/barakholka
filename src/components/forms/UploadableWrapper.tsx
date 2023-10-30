"use client";
import { useState } from "react";
import Uploadable from "./Uploadable";
import { useAppSelector } from "@/redux/store";

type UploadableWrapperProps = {
  children: React.ReactNode;
  handleUpload: (fileList: FileList) => void;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const { children, handleUpload } = props;
  const [localDim, setLocalDim] = useState<boolean>(false);
  const dragAllow = useAppSelector((state) => state.drag.dragAllow);

  return (
    <div className="h-auto w-full" onDrop={(e) => e.preventDefault()}>
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
          handleUpload(e.dataTransfer.files);
        }}
        className="absolute z-20 hidden h-full w-full select-none items-center justify-center overflow-hidden bg-black text-white opacity-70"
        style={localDim ? { display: "flex" } : {}}
      >
        <Uploadable />
      </div>
      <div
        className="h-full w-full"
        onDragEnter={(e) => {
          e.preventDefault();
          if (dragAllow) setLocalDim(true);
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default UploadableWrapper;
