"use server";
import prisma from "@/db";
import { PostData, PostState } from "@/components/postEditor/PostEditor";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { revalidatePath } from "next/cache";
import { verifyToken } from "./userActions";
import { Post } from "@/components/postCard/PostCard";
export const getPosts = async (
  favorited: boolean = false,
  userPosts: boolean = false,
) => {
  const uuid = await verifyToken();
  const posts = (await prisma.post.findMany({
    where: {
      ...(favorited && uuid
        ? {
            favoritedBy: {
              some: {
                userId: uuid,
              },
            },
          }
        : {}),
      ...(userPosts && uuid ? { posterId: uuid } : {}),
    },
  })) as Post[];
  return posts;
};
export const getPostData = async (id: number) => {
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      posterId: true,
      title: true,
      type: true,
      description: true,
      price: true,
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
        post: post as PostState & { id: number },
        carDetails: details as CarState,
      };
    else
      return {
        post: post as PostState & { id: number },
        estateDetails: details as EstateState,
      };
  } else return { post: undefined, details: undefined };
};
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
          thumbnails: {
            create: [
              ...postData.thumbnails.map((thumbnail) => {
                return { thumbnail: thumbnail };
              }),
            ],
          },
        },
      });
      if (postData.type === "car")
        await prisma.car.create({
          data: { postId: id, ...(postData.details as CarState) },
        });
      else if (postData.type === "estate")
        await prisma.estate.create({
          data: { postId: id, ...(postData.details as EstateState) },
        });
    } catch (error) {
      console.log(error);
    }
  }
};
export const deletePost = async (postId: number) => {
  const uuid = await verifyToken();
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
  if (uuid && post && uuid === post.posterId) {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return true;
  }
  return false;
};
export const updatePost = async (postId: number, postData: PostData) => {
  const uuid = await verifyToken();
  const originalPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (uuid && originalPost) {
    const res = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: postData.title,
        type: postData.type,
        description: postData.description,
        price: postData.price,
        thumbnails: {
          deleteMany: {},
          create: [
            ...postData.thumbnails.map((thumbnail) => {
              return { thumbnail: thumbnail };
            }),
          ],
        },
      },
    });
    //Менять тип поста нельзя!!
    if (postData.type === "car")
      await prisma.car.update({
        where: {
          postId,
        },
        data: { ...(postData.details as CarState) },
      });
    else if (postData.type === "estate")
      await prisma.estate.update({
        where: {
          postId,
        },
        data: { ...(postData.details as EstateState) },
      });
    if (res) {
      revalidatePath(`/post/${postId}`);
      return true;
    }
  }
  return false;
};
//При изображении favorites используется клиентский компонент, ревалидация не нужна
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
        }).length !== 0,
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
