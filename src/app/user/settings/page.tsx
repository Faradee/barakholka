"use client";
import { UserDataInfo, updateUser } from "@/actions/userActions";
import { setUserData } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
const AccountSettings = () => {
  const userData = useAppSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tempUser, setTempUser] = useState<typeof userData>(userData);
  const dispatch = useDispatch();
  const handleSubmit = async (user: UserDataInfo) => {
    console.log("user changing...");
    await updateUser(user);
    dispatch(setUserData(user));
    console.log("user changed");
    setIsEdit(false);
  };
  useEffect(() => {
    return () => setIsEdit(false);
  }, []);
  return (
    <div className="mx-2 mb-2 lg:ml-4">
      <div className="relative flex flex-col gap-2 p-5 shadow-md ">
        <button
          onClick={() => setIsEdit(true)}
          className={`${isEdit ? "hidden" : "visible"} absolute right-2 top-2`}
        >
          <AiFillEdit size={20} />
        </button>
        <div className="flex gap-2">
          <div className="flex  flex-col gap-4">
            <span className="p-1">Полное имя:</span>
            <span className="p-1">E-mail:</span>
          </div>
          <form className="flex flex-col gap-4">
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
