"use server";
import prisma from "@/db";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import CarDetails from "@/components/post/CarDetails";
import EstateDetails from "@/components/post/EstateDetails";
import Gallery from "@/components/gallery/Gallery";
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
  const { post, thumbnails, carDetails, estateDetails } = postData;
  return (
    <div className="mt-5 flex h-full min-h-min w-full min-w-min flex-col">
      {post && (
        <div>
          <div className=" mb-2 flex items-center border-b-4 border-black pl-20 text-2xl font-bold">
            <span className="w-[70%]">{post.title} </span>
            <span className="flex w-[30%] justify-end">
              {parseInt(post.price).toLocaleString().replaceAll(",", " ")}₽
            </span>
          </div>
          <div className="mb-10 flex">
            {post.type !== "misc" && (
              <ul className="details-list w-[20vw] ">
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

            <div className="relative min-h-[200px] w-full">
              {thumbnails && (
                <Gallery
                  thumbnailList={thumbnails.map((thumbnail) => {
                    return thumbnail.thumbnail;
                  })}
                />
              )}
            </div>
          </div>
          <span className=" text-4xl font-bold">Комментарий продавца</span>
          <div className="mb-5 min-h-[300px] w-full border-2 border-black p-5">
            {post.description ? post.description : "Отсутствует"}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
