import prisma from "@/db";
import { Post } from "@/components/postCard/PostCard";
import { Metadata } from "next";
import { verifyToken } from "@/actions/userActions";
import PostCardList from "@/components/postCard/PostCardList";
export const dynamic = "force-dynamic";
const getPosts = async (
  favorited: boolean = false,
  userPosts: boolean = false,
) => {
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
};
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
      <PostCardList posts={posts} />
    </>
  );
};

export default Home;
