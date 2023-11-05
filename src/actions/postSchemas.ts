import zod from "zod";
export const estateSchema = zod.object({
  space: zod.string().min(1).max(16),
  rooms: zod.string().min(1).max(16),
  floor: zod.string().min(1).max(16),
  furniture: zod.boolean(),
  renovation: zod.boolean(),
});
export const carSchema = zod.object({
  kilometrage: zod.string().min(1).max(16),
  year: zod.string().min(4).max(16),
  horsepower: zod.string().min(1).max(16),
  transmission: zod.string().min(1).max(32),
  brand: zod.string().min(1).max(32),
  model: zod.string().min(1).max(32),
  color: zod.string().min(1).max(32),
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
    .max(2000, "Описание объявления не должно превышать 2000 символов"),
  price: zod.string().max(128),
  details: estateSchema.or(carSchema).optional(),
  thumbnails: zod.array(zod.string()),
});
