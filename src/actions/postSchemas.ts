import zod from "zod";
export const estateSchema = zod.object({
  space: zod.string().max(64),
  rooms: zod.string().max(64),
  floor: zod.string().max(64),
  furniture: zod.boolean(),
  renovation: zod.boolean(),
});
export const carSchema = zod.object({
  kilometrage: zod.string().max(64),
  year: zod.string().max(64),
  horsepower: zod.string().max(64),
  transmission: zod.string().max(64),
  brand: zod.string().max(64),
  model: zod.string().max(64),
  color: zod.string().max(64),
  damaged: zod.boolean(),
  trade: zod.boolean(),
});
export const postSchema = zod.object({
  posterId: zod
    .string()
    .uuid("Ошибка авторизации, попробуйте перезайти в аккаунт"),
  title: zod
    .string()
    .max(128, "Название объявление не должно прешывать 128 символов"),
  type: zod.union([
    zod.literal("car"),
    zod.literal("estate"),
    zod.literal("misc"),
  ]),
  description: zod
    .string()
    .max(1024, "Описание объявления не должно превышать 1024 символов"),
  price: zod.string().max(128),
  details: estateSchema.or(carSchema).optional(),
  thumbnail: zod.array(zod.string()),
});
