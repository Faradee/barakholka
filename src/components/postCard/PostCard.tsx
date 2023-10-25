"use server";
import Thumbnail from "./Thumbnail";
import prisma from "@/db";
import thumbnailPlaceholder from "/public/thumbnailPlaceholder.webp";
import Image from "next/image";
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
      <div className="relative h-64 w-full">
        {thumbnails.length !== 0 ? (
          <Thumbnail thumbnails={thumbnails} />
        ) : (
          <Image src={thumbnailPlaceholder} fill alt="thumbnail placeholder" />
        )}
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
