"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
const FileUploader = () => {
  const handleUpload = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file[0]);
      reader.onload = () => setImage(reader.result as string);
    }
  };
  const [image, setImage] = useState("/rea-logo.png");
  return (
    <div>
      <input onChange={(e) => handleUpload(e)} type="file" />
      <Image src={image} width={500} height={500} alt="image"></Image>
    </div>
  );
};

export default FileUploader;
