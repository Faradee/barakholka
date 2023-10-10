"use client";
import React, { useState } from "react";
import Image from "next/image";
type ThumbnailProps = {
  thumbnails: string[];
};

const Thumbnail = (props: ThumbnailProps) => {
  const { thumbnails } = props;
  const [thumbnail, setThumbnail] = useState<string>(thumbnails[0]);
  const parts = thumbnails.length < 5 ? thumbnails.length : 5;
  return (
    <div
      onMouseOut={() => setThumbnail(thumbnails[0])}
      className="accordeon relative h-full w-full rounded-xl"
    >
      <div className="pointer-events-none w-full">
        <Image
          src={thumbnail}
          style={{ borderRadius: "10px", objectFit: "cover" }}
          fill={true}
          alt="thumbnail"
        />
      </div>
      {thumbnails.map((thumbnail, index) => (
        <div
          className="accordeon-step absolute flex h-full justify-center"
          key={index}
          style={{
            left: `${(index / parts) * 100}%`,
            width: `${(1 / parts) * 100}%`,
          }}
          onMouseOver={() => setThumbnail(thumbnail)}
        >
          <div className="accordeon-bar absolute bottom-0 z-20 m-2 h-1 w-11/12 bg-slate-200 opacity-0 transition-all duration-200"></div>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
