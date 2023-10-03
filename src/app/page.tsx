import prisma from "@/db";
import PostCard, { Post } from "@/components/postCard/PostCard";

type FetchedPost = Omit<Post, "thumbnail"> & { thumbnail?: string[] };

const getPosts = async () => {
  const posts = (await prisma.post.findMany()) as FetchedPost[];
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
  return posts as Post[];
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
        <ul className="flex flex-wrap justify-center lg:mx-10 lg:justify-start">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      }
    </>
  );
};

export default Home;
