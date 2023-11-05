import prisma from "@/db";
import PostCard, { Post } from "@/components/postCard/PostCard";
import { Suspense, cache } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import { Metadata } from "next";
import { verifyToken } from "@/actions/userActions";
const getPosts = cache(
  async (favorited: boolean = false, userPosts: boolean = false) => {
    const uuid = await verifyToken();
    const posts = (await prisma.post.findMany({
      where: {
        ...(favorited && uuid
          ? {
              favoritedBy: {
                some: {
                  userId: uuid,
                },
              },
            }
          : {}),
        ...(userPosts && uuid ? { posterId: uuid } : {}),
      },
    })) as Post[];
    return posts;
  },
);
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
const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const posts = await getPosts(
    searchParams.favorites !== undefined,
    searchParams.myposts !== undefined,
  );
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
                      <Skeleton className="block h-64 w-full" />
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
