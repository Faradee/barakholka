"use client";
import React, { useState } from "react";
import Image from "next/image";
type ThumbnailProps = {
  thumbnails: string[];
};

const Thumbnail = (props: ThumbnailProps) => {
  const thumbnails = props.thumbnails;
  const [thumbnail, setThumbnail] = useState<string>(thumbnails[0]);
  const parts = thumbnails.length < 5 ? thumbnails.length : 5;

  return (
    <div
      onBlur={() => setThumbnail(thumbnail[0])}
      className="accordeon relative flex"
    >
      <div className="">
        <Image
          src={thumbnail}
          style={{ width: "100%", height: "100%", objectFit: "none" }}
          width={0}
          height={0}
          sizes="100vh"
          alt="thumbnail"
        />
      </div>
      {thumbnails.map((thumbnail, index) => (
        <div
          className={`w-1/${parts} left-${index}/${parts} absolute flex h-full justify-center`}
          key={index}
        >
          <div className="absolute bottom-0 z-20 m-2 h-1 w-11/12 bg-red-700"></div>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
