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
  //do grid card layout
  return (
    <div className="min-w-30 flex max-h-[40vh] min-h-[20vh] flex-col p-4 shadow-lg lg:mx-36 lg:w-1/4">
      <div className="flex h-3/4 ">
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
