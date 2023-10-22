import prisma from "@/db";
import PostCard, { Post } from "@/components/postCard/PostCard";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
type FetchedPost = Post;

const Home = async () => {
  const getPosts = async () => {
    const posts = (await prisma.post.findMany()) as FetchedPost[];
    return posts as Post[];
  };
  const posts = await getPosts();
  return (
    <>
      {
        <ul className="flex flex-wrap justify-center lg:mx-10 lg:justify-start">
          {posts.map((post) => (
            <li
              key={post.id}
              className="ml-5 min-h-[350px] w-3/4 min-w-[200px] md:w-1/2 lg:w-1/4"
            >
              <Link href={`/post/${post.id}`}>
                <Suspense
                  fallback={
                    <>
                      <Skeleton className="block h-[80%] w-full" />
                      <Skeleton className="block h-[10%] w-full" count={2} />
                    </>
                  }
                >
                  <PostCard {...post} />
                </Suspense>
              </Link>
            </li>
          ))}
        </ul>
      }
    </>
  );
};

export default Home;
