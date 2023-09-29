import prisma from "@/db";
import Link from "next/link";
import PostCard, { Post } from "@/components/postCard/PostCard";

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
  // const post = {
  //   posterId: "1",
  //   title: "poopie poop car lmaoooo",
  //   type: "car",
  //   description: "selling shit car lol",
  //   price: 1000000,
  // };
  // await prisma.post.create({
  //   data: post,
  // });
  const posts = await getPosts();
  return (
    <>
      <h1 className="text-2x1 font-bold">Posts</h1>
      {
        <ul className="flex flex-wrap justify-center pl-4 lg:justify-start">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      }
    </>
  );
};

export default Home;
