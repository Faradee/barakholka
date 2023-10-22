"use client";
import { useState } from "react";
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
      <div className="pointer-events-none absolute h-full w-full">
        <Image
          src={thumbnail}
          style={{ borderRadius: "10px", objectFit: "cover" }}
          fill={true}
          alt="thumbnail"
          priority
        />
      </div>
      {thumbnails.map((thumbnail, index) => (
        <div
          className={`${
            thumbnails.length > 1 && "accordeon-step"
          } absolute hidden h-full justify-center lg:flex`}
          key={index}
          style={{
            left: `${(index / parts) * 100}%`,
            width: `${(1 / parts) * 100}%`,
          }}
          onMouseOver={() => setThumbnail(thumbnail)}
        >
          <span className="accordeon-bar absolute bottom-0 z-10 m-2 block h-1 w-11/12 bg-slate-200 opacity-0 transition-all duration-200"></span>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
