import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard, { Post } from "./PostCard";
const PostCardList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="relative grid min-h-[calc(100vh-10rem+0.85rem)] w-full auto-cols-fr grid-flow-dense grid-cols-1 place-items-center gap-x-5 md:grid-cols-2 md:place-items-start xl:grid-cols-4 2xl:gap-x-10">
      {posts.map((post) => (
        <li
          key={post.id}
          className="relative min-h-[350px] w-3/4 min-w-[200px] md:w-full"
        >
          <Link href={`/post/${post.id}`} prefetch={false}>
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
  );
};

export default PostCardList;
