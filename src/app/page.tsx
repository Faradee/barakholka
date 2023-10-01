import prisma from "@/db";
import Link from "next/link";
import PostCard, { Post } from "@/components/postCard/PostCard";
import { Prisma } from "@prisma/client";
import FileUploader from "@/components/FileUploader";

const getPosts = async () => {
  const posts = (await prisma.post.findMany()) as Post[];

  for (const post of posts) {
    post.thumbnail = [];
    const thumbnails = await prisma.thumbnail.findMany({
      where: {
        postId: post.id,
      },
      take: 2,
    });

    thumbnails.forEach((thumbnail) => {
      post.thumbnail?.push(thumbnail.thumbnail);
    });
  }
  return posts;
};
const Home = async () => {
  // const carDetails = {
  //   postId: 1,
  //   kilometrage: 5000000,
  //   year: 2011,
  //   transmission: "manual",
  //   brand: "vaz",
  //   model: "volga",
  //   color: "silver",
  //   engine: "5.0 V8",
  //   damaged: true,
  // } as Prisma.CarCreateInput;
  // await prisma.car.create({
  //   data: carDetails,
  // });
  const posts = await getPosts();
  return (
    <>
      <h1 className="text-2x1 font-bold">Posts</h1>
      {
        <ul className="flex flex-wrap justify-center lg:justify-start">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      }
    </>
  );
};

export default Home;
