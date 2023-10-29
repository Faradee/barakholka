"use client";
import { updateUser } from "@/actions/userActions";
import { setUserData } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateUserSchema, userSchema } from "@/actions/schemas";
import zod from "zod";
const AccountSettings = () => {
  const userData = {
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
  const handleSubmit = async (user: zod.infer<typeof updateUserSchema>) => {
    setError("");
    const validate = user.originalPassword
      ? updateUserSchema.safeParse(user)
      : userSchema.safeParse(user);
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
    <div className="mx-2 mb-2 lg:ml-4">
      <div className="relative flex flex-col gap-2 p-5 shadow-md ">
        {error && (
          <span className="block w-full text-center text-red-500">{error}</span>
        )}
        <button
          onClick={() => {
            setIsEdit(true);
          }}
          className={`${isEdit ? "hidden" : "visible"} absolute right-2 top-2`}
        >
          <AiFillEdit size={20} />
        </button>
        <div className="flex select-none gap-2">
          <div className="flex flex-col gap-4">
            <span className="p-1">Полное имя:</span>
            <span className="p-1">E-mail:</span>
            <span className="p-1">Текущий пароль:</span>
            <span className="p-1">Новый пароль:</span>
            <span className="p-1">Подтвердите пароль:</span>
          </div>
          <form className="flex select-none flex-col gap-4">
            <input
              className={`mr-5 min-w-[30rem] flex-grow p-1 outline outline-1 outline-gray-500 focus:outline-2 ${
                !isEdit && "cursor-default bg-slate-200 text-gray-600"
              }`}
              onChange={(e) => {
                setTempUser({ ...tempUser, name: e.currentTarget.value });
              }}
              type="text"
              name="name"
              value={tempUser.name}
              readOnly={!isEdit}
            />
            <input
              className={`mr-5 min-w-[30rem] p-1 outline outline-1 outline-gray-500 focus:outline-2 ${
                !isEdit && "cursor-default bg-slate-200 text-gray-600"
              }`}
              onChange={(e) => {
                setTempUser({ ...tempUser, email: e.currentTarget.value });
              }}
              type="email"
              name="email"
              value={tempUser.email}
              readOnly={!isEdit}
            />
            <input
              className={`mr-5 min-w-[30rem] p-1 outline outline-1 outline-gray-500 placeholder:font-bold focus:outline-2 ${
                !isEdit && "cursor-default bg-slate-200 text-gray-600"
              }`}
              onChange={(e) => {
                setTempUser({
                  ...tempUser,
                  originalPassword: e.currentTarget.value,
                });
              }}
              type="password"
              name="originalPassword"
              placeholder={!isEdit ? "****************" : ""}
              value={tempUser.originalPassword}
              readOnly={!isEdit}
            />
            <input
              className={`mr-5 min-w-[30rem] p-1 outline outline-1 outline-gray-500 placeholder:font-bold focus:outline-2 ${
                !isEdit && "cursor-default bg-slate-200 text-gray-600"
              }`}
              onChange={(e) => {
                setTempUser({ ...tempUser, password: e.currentTarget.value });
              }}
              type="password"
              name="password"
              placeholder={!isEdit ? "****************" : ""}
              value={tempUser.password}
              readOnly={!isEdit}
            />
            <input
              className={`mr-5 min-w-[30rem] p-1 outline outline-1 outline-gray-500 placeholder:font-bold focus:outline-2 ${
                !isEdit && "cursor-default bg-slate-200 text-gray-600"
              }`}
              onChange={(e) => {
                setTempUser({
                  ...tempUser,
                  confirmPassword: e.currentTarget.value,
                });
              }}
              type="password"
              name="confirmPassword"
              placeholder={!isEdit ? "****************" : ""}
              value={tempUser.confirmPassword}
              readOnly={!isEdit}
            />
          </form>
        </div>
      </div>
      <div className={`${isEdit ? "visible" : "hidden"} my-5 flex `}>
        <div className="flex flex-grow justify-start">
          <button
            onClick={() => {
              setTempUser(userData);
              setIsEdit(false);
            }}
            className=" rounded-lg bg-slate-100 p-2 hover:bg-slate-200 active:bg-slate-300"
          >
            Отменить
          </button>
        </div>
        <div className="flex flex-grow justify-end">
          <button
            onClick={() => handleSubmit(tempUser)}
            className="rounded-lg bg-green-300 p-2 hover:bg-green-400 active:bg-green-500"
          >
            {" "}
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
