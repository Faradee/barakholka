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
