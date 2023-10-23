import prisma from "@/db";
import PostCard, { Post } from "@/components/postCard/PostCard";
import { Suspense, cache } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import { Metadata } from "next";
export const revalidate = 10;
type FetchedPost = Post;
const getPosts = cache(async () => {
  const posts = (await prisma.post.findMany()) as FetchedPost[];
  return posts as Post[];
});
export const generateMetadata = async (): Promise<Metadata> => {
  const posts = await getPosts();
  const titles: string[] = [];
  posts.forEach((post) => {
    titles.push(post.title);
  });
  return {
    description: "Место для покупки машин, недвижимости и прочего",
    keywords: titles,
  };
};
const Home = async () => {
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
