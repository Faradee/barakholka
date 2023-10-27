"use server";
import prisma from "@/db";
import { PostData } from "@/app/create/page";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { revalidatePath } from "next/cache";
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
