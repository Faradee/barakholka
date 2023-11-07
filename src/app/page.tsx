import { getPosts } from "@/actions/postActions";
import { Metadata } from "next";
import PostCardList from "@/components/postCard/PostCardList";
export const dynamic = "force-dynamic";
export const generateMetadata = async (): Promise<Metadata> => {
  const posts = await getPosts();
  const titles: string[] = [];
  posts.forEach((post) => {
    titles.push(post.title);
  });
  return {
    description: "Место для покупки автомобилей, недвижимости и прочего",
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
