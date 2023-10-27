"use server";
import { cookies } from "next/headers";
import prisma from "../db";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import zod from "zod";

const userSchema = zod.object({
  uuid: zod.string().uuid(),
  email: zod.string().email("not an email"),
  name: zod.string().max(64, "name length must not exceed 64 characters"),
  password: zod.string().optional(),
});
const userSchemaPassword = userSchema.required();

export type UserDataInfo = zod.infer<typeof userSchema>;
export type UserData = zod.infer<typeof userSchemaPassword>;

const verifyToken = async (next: (...args: any[]) => Promise<any>) => {
  const secret = process.env.SECRET!;
  if (cookies().has("token"))
    jwt.verify(cookies().get("token")!.value, secret, (err, decoded) => {
      if (err) {
        signUserOut();
        return "error";
      } else next();
    });
};
//TODO: PORT ALL ACTIONS TO ZOD INCLUDING CLIENT SIDE FORMS
export const updateUser = async (userData: zod.infer<typeof userSchema>) =>
  verifyToken(async () => {
    const validateUser = userSchema.safeParse(userData);
    if (validateUser.success) {
      await prisma.user.update({
        where: {
          uuid: userData.uuid,
        },
        data: {
          ...userData,
        },
      });
      return true;
    } else return false;
  });

export const createUser = async (userData: UserData) => {
  const validateUser = userSchemaPassword.safeParse(userData);
  if (validateUser.success) {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: validateUser.data.email,
      },
    });
    if (!foundUser)
      try {
        const hash = (await argon2.hash(validateUser.data.password)) as string;
        const { password, createdAt, ...createdUser } =
          await prisma.user.create({
            data: {
              ...validateUser.data,
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
  } else return console.log(validateUser.error);
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
