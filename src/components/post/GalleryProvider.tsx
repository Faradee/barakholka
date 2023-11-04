"use server";
import React from "react";
import Gallery from "../gallery/Gallery";
import prisma from "@/db";
//Фетчит картинки для галерею
const GalleryProvider = async (props: {
  id: number;
  deletable?: boolean;
  uploadable?: boolean;
}) => {
  const { id, deletable, uploadable } = props;
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
      <Gallery
        thumbnailList={thumbnails}
        deleteable={deletable}
        uploadable={uploadable}
      />
    </div>
  );
};

export default GalleryProvider;
