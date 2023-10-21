"use server";
import prisma from "@/db";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import CarDetails from "@/components/post/CarDetails";
import EstateDetails from "@/components/post/EstateDetails";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GalleryProvider from "@/components/post/GalleryProvider";
const page = async (params: { params: { id: string } }) => {
  const { id } = params.params;
  const getPostData = async (id: number) => {
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
  };
  const postData = await getPostData(parseInt(id));
  const { post, carDetails, estateDetails } = postData;
  return (
    <div className="mt-5 flex h-full min-h-min w-full min-w-min flex-col">
      {post && (
        <div>
          <div className=" mb-2 flex items-center border-b-4 border-black text-2xl font-bold lg:pl-20">
            <span className="mr-16 lg:w-[70%]">{post.title} </span>
            <span className="flex justify-end lg:w-[30%]">
              {parseInt(post.price).toLocaleString().replaceAll(",", " ")}₽
            </span>
          </div>
          <div className=" mb-10 flex flex-col  lg:flex-row">
            {post.type !== "misc" && (
              <ul className="details-list order-last w-full lg:order-first lg:w-[30vw] ">
                {post.type === "car" && carDetails ? (
                  <CarDetails carDetails={carDetails} />
                ) : (
                  post.type === "estate" &&
                  estateDetails && (
                    <EstateDetails estateDetails={estateDetails} />
                  )
                )}
              </ul>
            )}

            <div className="relative min-h-[400px] w-full">
              {post && (
                <Suspense
                  fallback={<Skeleton className="block h-full w-full" />}
                >
                  <GalleryProvider id={post.id} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="m-5">
            <span className=" text-4xl font-bold">Комментарий продавца</span>
            <div className="mb-5 min-h-[300px] w-full border-2 border-black p-5">
              {post.description ? post.description : "Отсутствует"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
