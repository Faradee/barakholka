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
  return (
    <div className="min-w-80 h-40 p-4 shadow-md">
      <span className="w-full text-2xl font-semibold">{props.title}</span>
      <div className="flex"></div>
    </div>
  );
};

export default PostCard;
