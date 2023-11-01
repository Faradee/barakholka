"use server";
import { cookies } from "next/headers";
import prisma from "../db";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import zod from "zod";
import {
  userDataSchema,
  setPasswordSchema,
  updateUserSchema,
  signInSchema,
  signUpSchema,
} from "./userSchemas";

const verifyToken = async () => {
  const secret = process.env.SECRET!;

  if (cookies().has("token")) {
    try {
      const uuid = jwt.verify(cookies().get("token")!.value, secret) as string;
      if (uuid) {
        const foundUser = prisma.user.findFirst({
          where: {
            uuid: uuid,
          },
        });
        if (foundUser !== null) return uuid;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return false;
};

const setPassword = async (passData: zod.infer<typeof setPasswordSchema>) => {
  const db = await prisma.user.findFirst({
    where: {
      uuid: passData.uuid,
    },
  });
  if (db && (await argon2.verify(db.password, passData.originalPassword))) {
    await prisma.user.update({
      where: {
        uuid: passData.uuid,
      },
      data: {
        password: await argon2.hash(passData.password),
      },
    });
    return true;
  }
  return false;
};

export const updateUser = async (
  userData: zod.infer<typeof updateUserSchema>,
) => {
  const uuid = await verifyToken();
  if (uuid) {
    const validate = userData.originalPassword
      ? updateUserSchema.safeParse(userData)
      : userDataSchema.safeParse(userData);
    if (validate.success) {
      const { originalPassword, confirmPassword, password, ...newData } =
        userData;
      if (originalPassword && confirmPassword && password) {
        const res = await setPassword({
          uuid,
          originalPassword,
          confirmPassword,
          password,
        });
        if (!res) return "Ошибка при изменении пароля, проверьте данные";
      }
      const findMail = await prisma.user.findFirst({
        where: {
          email: userData.email,
          NOT: {
            uuid: uuid,
          },
        },
        select: {
          email: true,
        },
      });
      if (!findMail) {
        await prisma.user.update({
          where: {
            uuid: uuid,
          },
          data: {
            ...newData,
          },
        });
        return true;
      } else return "Уже существует аккаунт привязанный к этой почте";
    } else return validate.error.issues[0].message;
  }
  return "Ошибка авторизации, попробуйте перезайти в аккаунт";
};
export const fetchUser = async () => {
  const uuid = await verifyToken();
  if (uuid && zod.string().uuid().safeParse(uuid).success) {
    const user = await prisma.user.findFirst({
      where: {
        uuid: uuid,
      },
    });
    if (user) {
      const { createdAt, password, ...returnUser } = user;
      return returnUser;
    }
  }
  return false;
};
export const createUser = async (userData: zod.infer<typeof signUpSchema>) => {
  const validateUser = signUpSchema.safeParse(userData);
  if (validateUser.success) {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: validateUser.data.email,
      },
    });
    if (!foundUser)
      try {
        const hash = (await argon2.hash(validateUser.data.password)) as string;
        const { confirmPassword, ...pushUser } = validateUser.data;
        const createdUser = await prisma.user.create({
          data: {
            ...pushUser,
            password: hash,
          },
          select: {
            uuid: true,
            name: true,
            email: true,
          },
        });
        const secret = process.env.SECRET!;
        const token = jwt.sign(createdUser.uuid, secret);
        Object.keys(createdUser).forEach((key) => {
          cookies().set(key, createdUser[key as keyof typeof createdUser]);
        });

        cookies().set("token", token, {
          sameSite: "strict",
        });
        return createdUser;
      } catch (err) {
        console.log(err);
      }
    else return "К почте существует уже привязанный аккаунт";
  } else return validateUser.error.issues[0].message;
};

export const signUser = async (userData: zod.infer<typeof signInSchema>) => {
  const validate = signInSchema.safeParse(userData);
  if (validate.success) {
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: userData.name }, { name: userData.name }],
      },
    });
    if (
      foundUser !== null &&
      (await argon2.verify(foundUser.password, userData.password))
    ) {
      const { password, createdAt, ...returnUser } = foundUser;
      const secret = process.env.SECRET!;
      const token = jwt.sign(returnUser.uuid, secret);
      cookies().set("token", token, { sameSite: "strict" });
      return returnUser;
    } else return "Неправильный пароль. Попробуйте еще раз.";
  } else return validate.error.issues[0].message;
};
export const signUserOut = () => {
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
};
export const getAvatar = async () => {
  const uuid = await verifyToken();
  if (uuid) {
    const avatar = await prisma.avatar.findFirst({
      where: {
        userId: uuid,
      },
      select: {
        image: true,
      },
    });
    if (avatar) return avatar.image;
  }
  return false;
};
export const setAvatar = async ({ image }: { image: string; uuid: string }) => {
  const uuid = await verifyToken();
  if (uuid) {
    await prisma.avatar.upsert({
      where: {
        userId: uuid,
      },
      update: {
        image: image,
      },
      create: {
        userId: uuid,
        image: image,
      },
    });
    return true;
  } else return false;
};
