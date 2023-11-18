"use client";
import { updateUser, fetchUser } from "@/actions/userActions";
import { setUserData } from "@/redux/slices/authSlice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserSchema, userDataSchema } from "@/actions/userSchemas";
import zod from "zod";
import DataForm from "@/components/forms/DataForm";
import Skeleton from "react-loading-skeleton";
const AccountSettings = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [initialUser, setInitialUser] =
    useState<zod.infer<typeof updateUserSchema>>();
  const [tempUser, setTempUser] =
    useState<zod.infer<typeof updateUserSchema>>();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const handleChange =
    (key: keyof zod.infer<typeof updateUserSchema>) => (stateValue: string) => {
      setEdited(true);
      if (tempUser) setTempUser({ ...tempUser, [key]: stateValue });
    };
  const handleSubmit = async (user: zod.infer<typeof updateUserSchema>) => {
    setError("");
    if (edited) {
      const validate = user.originalPassword
        ? updateUserSchema.safeParse(user)
        : userDataSchema.safeParse(user);
      if (validate.success) {
        const res = await updateUser(user);
        if (res === true) {
          const { originalPassword, password, confirmPassword, ...newUser } =
            user;
          dispatch(setUserData(newUser));
          setEdited(false);
          setIsEdit(false);
        } else setError(res);
      } else setError(validate.error.issues[0].message);
    }
  };
  useEffect(() => {
    const initUserData = async () => {
      const res = await fetchUser();
      if (res) {
        const { uuid, ...userData } = res;
        if (userData) {
          setInitialUser({
            ...userData,
            originalPassword: "",
            password: "",
            confirmPassword: "",
          });
          setTempUser({
            ...userData,
            originalPassword: "",
            password: "",
            confirmPassword: "",
          });
        }
      }
    };
    initUserData();
    return () => setIsEdit(false);
  }, []);
  if (tempUser)
    return (
      <form>
        <h1 className="text-2xl font-semibold">Изменение данных аккаунта</h1>
        <div className="relative flex w-full flex-col gap-2 p-5 shadow-md">
          {error && (
            <span className="block w-full text-center text-red-500">
              {error}
            </span>
          )}
          <div className="flex w-full select-none gap-2">
            <div className=" flex w-full select-none flex-col gap-4">
              <DataForm<typeof tempUser>
                state={tempUser}
                readOnly={!isEdit}
                handleChange={handleChange}
                label={[
                  "Имя: ",
                  "Почта: ",
                  "Город: ",
                  "Телефон: ",
                  "Текущий пароль: ",
                  "Новый пароль: ",
                  "Подтвердите пароль: ",
                ]}
                className={`ml-2 w-[32rem] flex-grow p-1 outline outline-1 outline-gray-500 focus:outline-2 ${
                  !isEdit && "cursor-default bg-slate-200 text-gray-600"
                }`}
                labelClassName="lg:text-right lg:w-48"
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
                      if (tempUser) handleSubmit(tempUser);
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
                      setTempUser(initialUser);
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
  else return <Skeleton count={8} width={"100%"} height={"100px"} />;
};

export default AccountSettings;
