import prisma from "@/db";
import PostCard, { Post } from "@/components/postCard/PostCard";
import { Suspense, cache } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import { Metadata } from "next";
export const dynamic = "force-static";
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
//TODO ADD PAGINATION
const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      {
        <ul className="relative grid w-full auto-cols-fr grid-flow-dense grid-cols-1 place-items-center gap-x-5 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-x-10">
          {posts.map((post) => (
            <li
              key={post.id}
              className="relative min-h-[350px] w-3/4 min-w-[200px] md:w-full"
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
