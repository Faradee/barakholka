import React from "react";

type PostType = "car" | "estate" | "misc";

export type PostCardProps = {
  id: number;
  posterId: string;
  title: string;
  type: PostType;
  thumbnail?: string;
  description?: string;
  price: number;
};

const PostCard = (props: PostCardProps) => {
  //do grid card layout
  return (
    <div className="min-w-40 mx-36 flex h-64 w-1/3 p-4 shadow-md">
      <div className="h-full w-1/3"></div>
      <span className="w-full text-2xl font-semibold">{props.title}</span>
      <div className="flex"></div>
    </div>
  );
};

export default PostCard;
