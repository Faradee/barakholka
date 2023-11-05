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
    <div className="mx-2 mb-1 flex justify-end">
      <Favorite postId={id} />
      {user.uuid === posterId && <PostActions postId={id} />}
    </div>
  );
};

export default PostInteractions;
