import zod from "zod";
export const userSchema = zod.object({
  uuid: zod.string().uuid(),
  email: zod.string().email({ message: "Неправильно указана почта" }),
  name: zod
    .string()
    .max(128, { message: "Имя не должно превышать 128 символов" }),
});
export const userDataSchema = userSchema.omit({ uuid: true });
const confirmPasswordSchema = zod.object({
  password: zod
    .string()
    .min(4, { message: "Пароль должен состоять минимум из 4 символов" }),
  confirmPassword: zod
    .string()
    .min(4, { message: "Пароль должен состоять минимум из 4 символов" }),
});
export const setPasswordSchema = confirmPasswordSchema.extend({
  uuid: zod.string().uuid(),
  originalPassword: zod.string().min(4),
});
export const signUpSchema = userSchema
  .omit({ uuid: true })
  .merge(confirmPasswordSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
  });
export const signInSchema = zod.object({
  name: zod
    .string()
    .max(128, { message: "Имя не должно превышать 128 символов" })
    .or(zod.string().email()),
  password: zod
    .string()
    .min(4, { message: "Пароль должен состоять минимум из 4 символов" }),
});
export const updateUserSchema = userSchema
  .omit({ uuid: true })
  .merge(confirmPasswordSchema)
  .extend({
    originalPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
  });