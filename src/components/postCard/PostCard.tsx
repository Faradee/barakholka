import Image from "next/image";
import React from "react";
import Thumbnail from "./Thumbnail";
import Link from "next/link";
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
    <Link href={`/${props.id}`} className="w-3/4 lg:w-1/4">
      <div className="h-64 w-full">
        <Thumbnail thumbnails={props.thumbnail} />
      </div>
      <div className="w-full">
        <span>{props.title}</span>
        <div className="border-bottom w-full py-0.5 text-xl font-bold">
          {props.price.toLocaleString().replaceAll(",", " ")} ₽
        </div>
        <span className="font-light text-slate-600">
          Выставлено: {props.createdAt.toLocaleDateString("ru-RU").toString()}
        </span>
      </div>
    </Link>
  );
};

export default PostCard;