"use client";
import { updateUser } from "@/actions/userActions";
import { setUserData } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserSchema, userDataSchema } from "@/actions/schemas";
import zod from "zod";
import DataForm from "@/components/forms/DataForm";
const AccountSettings = () => {
  const { uuid, ...userData } = {
    ...useAppSelector((state) => state.auth),
    password: "",
    confirmPassword: "",
    originalPassword: "",
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tempUser, setTempUser] =
    useState<zod.infer<typeof updateUserSchema>>(userData);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const handleChange = (key: keyof typeof userData) => (stateValue: string) => {
    setTempUser({ ...tempUser, [key]: stateValue });
  };
  const handleSubmit = async (user: zod.infer<typeof updateUserSchema>) => {
    setError("");
    const validate = user.originalPassword
      ? updateUserSchema.safeParse(user)
      : userDataSchema.safeParse(user);
    if (validate.success) {
      const res = await updateUser(user);
      if (res === true) {
        const { originalPassword, password, confirmPassword, ...newUser } =
          user;
        dispatch(setUserData(newUser));
        setIsEdit(false);
      } else setError(res);
    } else setError(validate.error.issues[0].message);
  };
  useEffect(() => {
    return () => setIsEdit(false);
  }, []);
  return (
    <form>
      <div className="relative flex w-full flex-col gap-2 p-5 shadow-md">
        {error && (
          <span className="block w-full text-center text-red-500">{error}</span>
        )}
        <div className="flex select-none gap-2">
          <div className=" flex w-full select-none flex-col gap-4">
            <DataForm<typeof tempUser>
              state={tempUser}
              readOnly={!isEdit}
              handleChange={handleChange}
              label={[
                "Имя: ",
                "Почта: ",
                "Текущий пароль: ",
                "Новый пароль: ",
                "Подтвердите пароль: ",
              ]}
              className={`ml-2 w-full flex-grow p-1 outline outline-1 outline-gray-500 focus:outline-2 ${
                !isEdit && "cursor-default bg-slate-200 text-gray-600"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="my-5 flex">
        {isEdit ? (
          <>
            <div className="flex w-full flex-row-reverse">
              <div className="flex flex-grow justify-end">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(tempUser);
                  }}
                  className="rounded-lg bg-green-300 p-2 hover:bg-green-400 active:bg-green-500"
                >
                  {" "}
                  Сохранить
                </button>
              </div>
              <div className="flex flex-grow justify-start">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setTempUser(userData);
                    setError("");
                    setIsEdit(false);
                  }}
                  className=" rounded-lg bg-slate-100 p-2 hover:bg-slate-200 active:bg-slate-300"
                >
                  Отменить
                </button>
              </div>
            </div>
          </>
        ) : (
          <button
            className=" rounded-lg bg-slate-100 p-2 hover:bg-slate-200 active:bg-slate-300"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Изменить
          </button>
        )}
      </div>
    </form>
  );
};

export default AccountSettings;
