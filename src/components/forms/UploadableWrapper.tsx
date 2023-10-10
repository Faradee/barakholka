"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
type UploadableWrapperProps = {
  children: JSX.Element;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const [image, setImage] = useState("/rea-logo.png");
  const handleUpload = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file[0]);
      reader.onload = () => setImage(reader.result as string);
    }
  };

  return (
    <div>
      <input onChange={(e) => handleUpload(e)} type="file" />
    </div>
  );
};

export default UploadableWrapper;
