"use server";
import prisma from "@/db";
import { PostData } from "@/app/create/page";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { revalidatePath } from "next/cache";
import { verifyToken } from "./userActions";
export const createPost = async (postData: PostData) => {
  if (postData) {
    try {
      const { id } = await prisma.post.create({
        data: {
          posterId: postData.posterId,
          title: postData.title,
          type: postData.type,
          description: postData.description,
          price: postData.price,
        },
      });
      await Promise.all([
        ...postData.thumbnails.map((thumbnail) => {
          return prisma.thumbnail.create({
            data: {
              postId: id,
              thumbnail: thumbnail,
            },
          });
        }),
      ]);
      if (postData.type === "car")
        await prisma.car.create({
          data: { postId: id, ...(postData.details as CarState) },
        });
      else if (postData.type === "estate")
        await prisma.estate.create({
          data: { postId: id, ...(postData.details as EstateState) },
        });
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
  }
};
export const findFavorite = async (postId: number) => {
  const uuid = await verifyToken();

  const favorites = await prisma.favorites.findMany({
    where: {
      postId: postId,
    },
  });

  if (favorites)
    return {
      favoritedByUser:
        favorites.filter((favorite) => {
          if (favorite.userId === uuid) return favorite;
        }).length !== 0
          ? true
          : false,
      favoriteCount: favorites.length,
    };
  return false;
};
export const setFavorite = async (postId: number) => {
  const uuid = await verifyToken();
  if (uuid) {
    const created = await prisma.favorites.create({
      data: {
        postId: postId,
        userId: uuid,
      },
    });

    if (created) return true;
  }
  return false;
};

export const unsetFavorite = async (postId: number) => {
  const uuid = await verifyToken();
  if (uuid) {
    const deleted = await prisma.favorites.delete({
      where: {
        postId_userId: {
          userId: uuid,
          postId,
        },
      },
    });
    if (deleted) return true;
  }
  return false;
};
