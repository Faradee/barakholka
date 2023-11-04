"use client";
import React from "react";
import Favorite from "@/components/post/Favorite";
import PostActions from "@/components/post/PostActions";
import { useAppSelector } from "@/redux/store";

const PostInteractions = ({
  id,
  posterId,
}: {
  id: number;
  posterId: string;
}) => {
  const user = useAppSelector((state) => state.auth);
  return (
    <h1 className="mb-1 flex w-1/2 justify-end">
      <Favorite postId={id} />
      {user.uuid === posterId && <PostActions postId={id} />}
    </h1>
  );
};

export default PostInteractions;
