import { verifyToken } from "@/actions/userActions";
import PostEditor from "@/components/postEditor/PostEditor";
import { redirect } from "next/navigation";
import React from "react";

const PostCreator = async () => {
  const uuid = await verifyToken();
  if (!uuid) redirect("/");
  return <PostEditor />;
};

export default PostCreator;
