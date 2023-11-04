import prisma from "@/db";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import CarDetails from "@/components/post/CarDetails";
import EstateDetails from "@/components/post/EstateDetails";
import { Suspense, cache } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GalleryProvider from "@/components/post/GalleryProvider";
import { Metadata } from "next";
import PostInteractions from "@/components/post/PostInteractions";

export const dynamic = "force-static";
const getPostData = cache(async (id: number) => {
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  if (post) {
    const details = await (post.type === "car"
      ? prisma.car.findFirst({
          where: {
            postId: id,
          },
        })
      : post.type === "estate"
      ? prisma.estate.findFirst({
          where: {
            postId: id,
          },
        })
      : undefined);
    if (post.type === "car")
      return {
        post: post,
        carDetails: details as CarState,
      };
    else
      return {
        post: post,
        estateDetails: details as EstateState,
      };
  } else return { post: undefined, details: undefined };
});
type Props = {
  params: { id: string };
};
export async function generateMetadata({
  params,
}: Props): Promise<Metadata | null> {
  const { id } = params;
  const { post, carDetails, estateDetails } = await getPostData(parseInt(id));
  const details = carDetails ? carDetails : estateDetails;
  const props: string[] = [];
  for (let prop in details) {
    if (typeof details[prop as keyof typeof details] === "string")
      props.push(details[prop as keyof typeof details]);
  }
  if (post) {
    return {
      title: post.title,
      description: post.description,
      keywords: props,
    };
  } else return null;
}
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { post, carDetails, estateDetails } = await getPostData(parseInt(id));
  const { createdAt, updatedAt, ...postData } = post!;
  return (
    <main className="mt-5 flex h-full min-h-min w-full min-w-min flex-col">
      {post && (
        <div>
          <header className=" mb-2 flex items-center border-b-4 border-black text-2xl font-bold lg:pl-20">
            <h1 className="flex w-1/2">{post.title} </h1>
            <PostInteractions id={post.id} posterId={post.posterId} />
          </header>
          <div className=" mb-10 flex flex-col  lg:flex-row">
            <ul className="details-list order-last w-full min-w-[300px] px-5 lg:order-first lg:w-[30vw] ">
              <li className="mb-5 text-xl">
                <span>Цена:</span>
                <span>
                  {parseInt(post.price).toLocaleString().replaceAll(",", " ")}₽
                </span>
              </li>

              {post.type === "car" && carDetails ? (
                <CarDetails carDetails={carDetails} />
              ) : (
                post.type === "estate" &&
                estateDetails && <EstateDetails estateDetails={estateDetails} />
              )}
            </ul>

            <div className="relative h-full w-full">
              <Suspense fallback={<Skeleton className="block h-full w-full" />}>
                <GalleryProvider id={post.id} />
              </Suspense>
            </div>
          </div>

          <div className="m-5">
            <label htmlFor="description" className=" text-4xl font-bold">
              Комментарий продавца
            </label>
            <textarea
              id="description"
              defaultValue={post.description ? post.description : "Отсутствует"}
              className={`mb-5 min-h-[300px] w-full border-2 border-black p-5 ${
                !post.description && "text-gray-400"
              } focus:outline-none`}
              readOnly
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default page;
