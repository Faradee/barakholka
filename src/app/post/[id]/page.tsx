import CarDetails from "@/components/post/CarDetails";
import EstateDetails from "@/components/post/EstateDetails";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GalleryProvider from "@/components/post/GalleryProvider";
import { Metadata } from "next";
import PostInteractions from "@/components/post/PostInteractions";
import { getPostData } from "@/actions/postActions";
import PosterContainer from "@/components/post/PosterContainer";
import prisma from "@/db";
export const dynamic = "force-static";

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
  const posterData = post
    ? await prisma.user.findFirst({
        where: {
          uuid: post?.posterId,
        },
        select: {
          name: true,
          avatar: {
            select: {
              image: true,
            },
          },
          createdAt: true,
          email: true,
          phone: true,
          city: true,
        },
      })
    : undefined;
  return (
    <main className="mt-5 flex h-full min-h-min w-full min-w-min flex-col">
      {post && (
        <div className="container mx-auto">
          <header className="  mb-2 flex w-full items-center border-b-4 border-black text-2xl font-bold">
            <h1 className="ml-2 flex w-1/2">{post.title} </h1>
            <h1 className="mb-1 mr-2 flex w-1/2 justify-end">
              <PostInteractions id={post.id} posterId={post.posterId} />
            </h1>
          </header>
          <div className=" mb-10 flex flex-col  lg:flex-row">
            <ul className="details-list order-last w-full min-w-[300px] px-5 lg:order-first lg:w-[30vw] ">
              {posterData && (
                <li>
                  <PosterContainer posterData={posterData} />
                </li>
              )}

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
