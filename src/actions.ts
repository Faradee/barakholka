"use server";
import { PostData } from "./app/create/page";
import { CarState } from "./components/postEditor/CarForm";
import { EstateState } from "./components/postEditor/EstateForm";
import { cookies } from "next/headers";
import prisma from "./db";
import argon2 from "argon2";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
export type UserData = {
  email: string;
  password: string;
  name: string;
};
//TODO ADD MIDDLEWARE FOR JWT VERIFICATION

const middleware = async (next: (...args: any[]) => any) => {
  const secret = process.env.SECRET!;
  if (cookies().has("token"))
    jwt.verify(cookies().get("token")!.value, secret, (err, decoded) => {
      if (err) {
        signUserOut();
        return "error";
      } else next();
    });
};

export const createUser = async (userData: UserData) => {
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
      const secret = process.env.SECRET!;
      const token = jwt.sign(createdUser, secret);
      Object.keys(createdUser).forEach((key) => {
        cookies().set(key, createdUser[key as keyof typeof createdUser]);
      });
      cookies().set("token", token);
      return createdUser;
    } catch (err) {
      console.log(err);
    }
  else console.log("user already exists");
};

export const signUser = async (userData: UserData) => {
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
    const secret = process.env.SECRET!;
    const token = jwt.sign(returnUser, secret);
    cookies().set("token", token, { sameSite: "strict" });
    return returnUser;
  } else return null;
};
export const signUserOut = () => {
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
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
