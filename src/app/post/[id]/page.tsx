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
    if (post) {
      const thumbnails = await prisma.thumbnail.findMany({
        where: {
          postId: id,
        },
      });
      const details = await (post.type === "car"
        ? prisma.car.findFirst({
            where: {
              postId: id,
            },
          })
        : post.type === "estate"
        ? prisma.estate.findFirst({
            where: {
              postId: id,
            },
          })
        : undefined);
      return { post: post, thumbnails: thumbnails, details: details };
    } else return undefined;
  };
  const postData = getPostData(parseInt(id));
  return <div>{id} </div>;
};

export default page;
