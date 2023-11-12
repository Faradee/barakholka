import { verifyToken } from "@/actions/userActions";
import PostEditor from "@/components/postEditor/PostEditor";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Создать объявление",
};
const PostCreator = async () => {
  const uuid = await verifyToken();
  if (!uuid) redirect("/");
  return <PostEditor />;
};

export default PostCreator;
