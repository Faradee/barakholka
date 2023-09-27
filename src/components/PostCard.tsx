import Image from "next/image";
import React from "react";

type PostType = "car" | "estate" | "misc";

export type PostCardProps = {
  id: number;
  posterId: string;
  title: string;
  type: PostType;
  thumbnails: string[];
  description?: string;
  price: number;
};

const PostCard = (props: PostCardProps) => {
  //do grid card layout
  return (
    <div className="min-w-40 flex max-h-[40vh] min-h-[20vh] flex-col p-4 shadow-lg lg:mx-36 lg:w-1/3">
      <div className="flex h-3/4 ">
        <div className="w-3/4 flex-none">
          <Image
            src={props.thumbnails[0]}
            alt="thumbnail"
            width={0}
            height={0}
            sizes="100%"
            style={{
              display: "block",
              width: "auto",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="thumbnail-list h-full w-full">
          <div className="">
            <Image
              src={props.thumbnails[1]}
              alt="thumbnail"
              width={0}
              height={0}
              sizes="100%"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="">
            <Image
              src={props.thumbnails[1]}
              alt="thumbnail"
              width={0}
              height={0}
              sizes="100%"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="">
            <Image
              src={props.thumbnails[1]}
              alt="thumbnail"
              width={0}
              height={0}
              sizes="100%"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="">
            <Image
              src={props.thumbnails[1]}
              alt="thumbnail"
              width={0}
              height={0}
              sizes="100%"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
      <div className=" h-auto">
        <div className="border-bottom w-full py-0.5 text-xl font-bold">
          {props.price.toLocaleString().replaceAll(",", " ")} ₽
        </div>
        <div>{props.description}</div>
      </div>

      <div className="flex"></div>
    </div>
  );
};

export default PostCard;
