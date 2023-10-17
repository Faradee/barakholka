"use server";
import prisma from "@/db";
const page = (params: { params: { id: string } }) => {
  const { id } = params.params;
  const getPostData = async (id: number) => {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    const thumbnails = await prisma.thumbnail.findMany({
      where: {
        postId: post.id,
      },
      take: 5,
    });
    thumbnails.forEach((thumbnail) => {
      post.thumbnails?.push(thumbnail.thumbnail);
    });
    return posts as Post[];
  };
  return <div>{id} </div>;
};

export default page;
