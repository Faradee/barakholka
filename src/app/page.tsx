import { getPosts } from "@/actions/postActions";
import { Metadata } from "next";
import PostCardList from "@/components/postCard/PostCardList";
import PaginationSwitch from "@/components/postCard/PaginationSwitch";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
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
const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = parseInt(searchParams["page"] ? searchParams["page"] : "1");
  const posts = await getPosts(
    page,
    searchParams.search,
    searchParams.favorites !== undefined,
    searchParams.posts !== undefined,
  );
  return (
    <>
      {posts.length > 0 ? (
        <>
          <PostCardList posts={posts.slice(0, 8)} />
          <PaginationSwitch lastPage={posts.length < 9} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          {searchParams.search ? "Объявлений по запросу нет" : "Объявлений нет"}
        </div>
      )}
    </>
  );
};

export default Home;
