"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PostEditor, { PostData } from "./PostEditor";
import { SetPostData } from "@/redux/slices/postSlice";
import { setThumbnails } from "@/redux/slices/thumbnailSlice";

const PostEditorProvider = ({
  postData,
  postId,
}: {
  postData: PostData;
  postId: number;
}) => {
  const dispatch = useDispatch();
  console.log(postData);
  useEffect(() => {
    dispatch(SetPostData(postData));
    dispatch(setThumbnails(postData.thumbnails));
  }, [dispatch, postData]);
  return <PostEditor editedPost={postId} />;
};

export default PostEditorProvider;
