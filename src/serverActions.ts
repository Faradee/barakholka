"use server";
import { PostData } from "./app/create/page";
import { CarState } from "./components/postEditor/CarForm";
import { EstateState } from "./components/postEditor/EstateForm";
import prisma from "./db";
import argon2 from "argon2";
export type UserData = {
  email: string;
  password: string;
  name: string;
};

export async function createUser(userData: UserData) {
  const foundUser = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });
  if (!foundUser)
    try {
      const hash = (await argon2.hash(userData.password)) as string;
      const { password, createdAt, ...createdUser } = await prisma.user.create({
        data: {
          ...userData,
          password: hash,
        },
      });
      return createdUser;
    } catch (err) {
      console.log(err);
    }
  else console.log("user already exists");
}

export async function signUser(userData: UserData) {
  const foundUser = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });

  if (
    foundUser !== null &&
    (await argon2.verify(foundUser.password, userData.password))
  ) {
    const { password, createdAt, ...returnUser } = foundUser;
    return returnUser;
  } else return null;
}

export async function createPost(postData: PostData) {
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
      const promises = [
        ...postData.thumbnails.map((thumbnail) => {
          return prisma.thumbnail.create({
            data: {
              postId: id,
              thumbnail: thumbnail,
            },
          });
        }),
      ];
      await Promise.all(promises);
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
}
