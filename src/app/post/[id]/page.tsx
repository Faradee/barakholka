"use server";
import Image from "next/image";
import prisma from "@/db";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
const page = async (params: { params: { id: string } }) => {
  const { id } = params.params;
  const getPostData = async (id: number) => {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    if (post) {
      const thumbnails = await prisma.thumbnail.findMany({
        where: {
          postId: id,
        },
      });
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
          thumbnails: thumbnails,
          carDetails: details as CarState,
        };
      else
        return {
          post: post,
          thumbnails: thumbnails,
          estateDetails: details as EstateState,
        };
    } else
      return { post: undefined, thumbnails: undefined, details: undefined };
  };
  const postData = await getPostData(parseInt(id));
  const { post, thumbnails, details, carDetails, estateDetails } = postData;

  return (
    <div className="mt-5 flex h-full min-h-min w-full min-w-min flex-col">
      <div className="lg:mx-[10vw]">
        {post && (
          <div>
            <div className=" ml-20 flex items-center text-2xl font-bold">
              <span className="w-[70%]">{post.title} </span>
              <span className="flex w-[30%] justify-end">
                {parseInt(post.price).toLocaleString().replaceAll(",", " ")}₽
              </span>
            </div>
            <div className="flex">
              <div className="h-[100vh] w-[30vw]">
                {post.type === "car" && carDetails ? (
                  <div>
                    <div>{carDetails.kilometrage}</div>
                    <div>{carDetails.brand}</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="relative h-[60vh] w-[50vw]">
                {thumbnails && (
                  <Image
                    src={thumbnails[0].thumbnail}
                    alt="thumbnail"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
