"use server";
import prisma from "@/db";
import PostCard, { Post } from "@/components/postCard/PostCard";

type FetchedPost = Post;

const Home = async () => {
  const getPosts = async () => {
    const posts = (await prisma.post.findMany()) as FetchedPost[];
    for (const post of posts) {
      post.thumbnails = [];
      const thumbnails = await prisma.thumbnail.findMany({
        where: {
          postId: post.id,
        },
        take: 5,
      });
      thumbnails.forEach((thumbnail) => {
        post.thumbnails?.push(thumbnail.thumbnail);
      });
    }
    return posts as Post[];
  };
  const posts = await getPosts();
  return (
    <div className="lg:px-64">
      <h1 className="text-2x1 font-bold">Posts</h1>
      {
        <ul className="flex flex-wrap justify-center lg:mx-10 lg:justify-start">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      }
    </div>
  );
};

export default Home;
