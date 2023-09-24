import prisma from "@/db";
import Link from "next/link";
import PostCard, { PostCardProps } from "@/components/PostCard";

const getPosts = async () => {
  return prisma.post.findMany();
};
const Home = async () => {
  //await prisma.todo.create({data:{title:"test",complete:false}})
  const posts = await getPosts();
  const post: PostCardProps = {
    posterId: "1",
    id: 1,
    title: "poopie poop car lmaoooo",
    type: "car",
    thumbnail: "",
    description: "selling shit car lol",
    price: 1000000,
  };
  return (
    <>
      <h1 className="text-2x1 font-bold">Posts</h1>
      {
        <ul className="pl-4">
          {/* {posts.map((post) => ( */}
          <PostCard {...post} />
          {/* ))} */}
        </ul>
      }
    </>
  );
};

export default Home;
