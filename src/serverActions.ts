"use server";
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
      await prisma.user.create({
        data: {
          ...userData,
          password: hash,
        },
      });
    } catch (err) {
      console.log(err);
    }
  else console.log("user exists");
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
    return { name: foundUser.name };
  } else return null;
}
