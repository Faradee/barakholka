import Image from "next/image";
import React from "react";
import Thumbnail from "./Thumbnail";

export type Post = {
  id: number;
  posterId: string;
  title: string;
  type: string;
  thumbnail: string[];
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

const PostCard = (props: Post) => {
  return (
    <div className="min-w-30 flex h-80 flex-col p-4 shadow-lg lg:mx-[10%] lg:w-1/5">
      <div className="flex h-3/4 w-full">
        <Thumbnail thumbnails={props.thumbnail} />
      </div>
      <div className=" h-auto">
        <div className="border-bottom w-full py-0.5 text-xl font-bold">
          {props.price.toLocaleString().replaceAll(",", " ")} ₽
        </div>
        <div>{props.description}</div>
      </div>

      <div className="flex"></div>
    </div>
  );
};

export default PostCard;
