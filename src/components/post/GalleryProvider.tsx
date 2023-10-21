"use server";
import React from "react";
import Gallery from "../gallery/Gallery";
import prisma from "@/db";
const GalleryProvider = async (props: { id: number }) => {
  const { id } = props;
  const thumbnails = (
    await prisma.thumbnail.findMany({
      where: {
        postId: id,
      },
    })
  ).map((thumbnail) => {
    return thumbnail.thumbnail;
  });
  return (
    <div>
      <Gallery thumbnailList={thumbnails} />
    </div>
  );
};

export default GalleryProvider;
