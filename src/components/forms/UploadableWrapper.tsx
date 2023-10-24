"use client";
import { useState } from "react";
import Uploadable from "./Uploadable";
import { useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { setError } from "@/app/redux/slices/errorSlice";

type UploadableWrapperProps = {
  children: React.ReactNode;
  addFile: (file: string) => void;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const { children, addFile } = props;
  const [localDim, setLocalDim] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const dispatch = useDispatch();
  const dragAllow = useAppSelector((state) => state.drag.dragAllow);

  const handleUpload = (e: React.DragEvent) => {
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const reader = new FileReader();
        const file = e.dataTransfer.items[i];
        if (
          file.kind === "file" &&
          file.type.match("^image/(png|jpeg|webp|jpg)")
        ) {
          const image = file.getAsFile() as Blob;
          if (size + image.size < 1024 * 1024 * 5) {
            setSize(size + image.size);
            reader.readAsDataURL(image);
            reader.onload = () => addFile(reader.result as string);
          } else break;
        } else {
          dispatch(setError("TypeError"));
          break;
        }
      }
    }
  };

  return (
    <div onDrop={(e) => e.preventDefault()}>
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
        className="fixed z-20 -mt-5 hidden h-full w-full select-none items-center justify-center overflow-hidden bg-black text-white opacity-70 lg:-ml-64"
        style={localDim ? { display: "flex" } : {}}
      >
        <Uploadable />
      </div>
      <div
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
