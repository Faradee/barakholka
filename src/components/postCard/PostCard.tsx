"use server";
import Thumbnail from "./Thumbnail";
import prisma from "@/db";
export type Post = {
  id: number;
  posterId: string;
  title: string;
  type: string;
  description?: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
};

const PostCard = async (props: Post) => {
  const { id } = props;
  const thumbnails = (
    await prisma.thumbnail.findMany({
      where: {
        postId: id,
      },
      take: 5,
    })
  ).map((thumbnail) => {
    return thumbnail.thumbnail;
  });
  return (
    <>
      <div className="h-64 w-full">
        <Thumbnail thumbnails={thumbnails} />
      </div>
      <div className="w-full">
        <span>{props.title}</span>
        <div className="border-bottom w-full py-0.5 text-xl font-bold">
          {parseInt(props.price).toLocaleString().replaceAll(",", " ")} ₽
        </div>
        <span className="font-light text-slate-600">
          Выставлено: {props.createdAt.toLocaleDateString("ru-RU").toString()}
        </span>
      </div>
    </>
  );
};

export default PostCard;
