"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { signIn } from "@/app/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import {
  AiOutlineClose,
  AiFillLock,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { UserData, createUser, signUser } from "@/serverActions";
import FormField from "../forms/FormField";
type AuthModalProps = {
  handleDim: () => void;
};
type Auth = {
  email: string;
  password: string;
  name: string;
  confirmPass: string;
  isSignup: boolean;
  showPassword: boolean;
};

const AuthModal = ({ handleDim }: AuthModalProps) => {
  const initialAuth = {
    email: "",
    password: "",
    name: "",
    confirmPass: "",
    isSignup: false,
    showPassword: false,
  };
  const [auth, setAuth] = useState<Auth>(initialAuth);
  const { email, password, name, confirmPass, isSignup, showPassword } = auth;
  const [credentialsWarning, setCredentialsWarning] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowPassword = () => {
    setAuth({ ...initialAuth, showPassword: !showPassword });
  };
  const handleToggle = () => {
    setCredentialsWarning(false);
    setAuth({ ...initialAuth, isSignup: !isSignup });
  };
  const handleSignIn = async () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    } as UserData;
    const fetchedUser = await signUser(userData);
    if (fetchedUser) {
      dispatch(signIn(fetchedUser));
      handleDim();
    } else setCredentialsWarning(true);
  };
  const handleSignUp = async () => {
    if (name && email && password && confirmPass && confirmPass === password) {
      const userData = {
        name: name,
        email: email,
        password: password,
      } as UserData;
      const createdUser = await createUser(userData);
      if (createdUser) {
        dispatch(signIn(createdUser));
        handleDim();
        return;
      }
    }
    setCredentialsWarning(true);
  };
  const setAuthProp: React.Dispatch<React.SetStateAction<any>> = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAuth({ ...auth, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setAuthProp: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setAuthProp(e);
    setCredentialsWarning(false);
  };
  return (
    <div className="fixed left-1/2 top-1/2 z-30 flex  w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-start gap-y-2 rounded-3xl bg-white px-4 py-4 lg:w-1/4 lg:px-12">
      <Image
        className=""
        src="/rea-logo.png"
        width="150"
        height="300"
        alt="Logo"
      />
      <div
        onClick={handleDim}
        className="absolute -right-12 top-0 flex h-10 w-10 cursor-pointer items-center justify-center opacity-75 hover:opacity-100"
      >
        <AiOutlineClose size={40} color="white" />
      </div>
      <h1 className="text-2xl font-semibold">
        {isSignup ? "Создание аккаунта" : "Вход"}
      </h1>
      <form id="auth">
        {isSignup && (
          <FormField
            useState={[name, setAuthProp]}
            type="text"
            placeholder="Полное имя"
            onChange={handleChange}
            name="name"
          />
        )}
        <FormField
          placeholder="Email адрес"
          type="email"
          onChange={handleChange}
          icon={BsFillEnvelopeFill}
          name="email"
          useState={[email, setAuthProp]}
        />
        <FormField
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          useState={[password, setAuthProp]}
          onChange={handleChange}
          name="password"
          icon={AiFillLock}
        >
          {!isSignup && (
            <div className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <AiFillEye size={24} />
              ) : (
                <AiFillEyeInvisible size={24} />
              )}
            </div>
          )}
        </FormField>
        {isSignup && (
          <FormField
            useState={[confirmPass, setAuthProp]}
            placeholder="Подтвердите пароль"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="showPassword"
          />
        )}
        {credentialsWarning && (
          <span className="flex justify-center text-center text-red-500">
            {isSignup
              ? "Проверьте данные и попробуйте еще раз"
              : "Неправильный пароль или почта"}
          </span>
        )}
        <button
          type="button"
          onClick={isSignup ? handleSignUp : handleSignIn}
          className="h-12 w-full rounded-md bg-red-600 font-semibold text-white hover:bg-red-700 active:bg-red-800"
        >
          {isSignup ? "Создать аккаунт" : "Войти"}
        </button>
      </form>
      <div className="flex w-full items-center justify-center before:h-[1px] before:flex-grow before:bg-slate-300 before:content-[''] after:h-[1px] after:flex-grow after:bg-slate-300 after:content-['']">
        <span className="mx-2">Или</span>
      </div>
      <div className="text-center">
        {isSignup ? "Есть аккаунт? " : "Не зарегистрированы? "}
        <span
          onClick={handleToggle}
          className="cursor-pointer text-center font-semibold text-blue-600 hover:underline"
        >
          {isSignup ? "Войдите" : "Создайте аккаунт"}
        </span>
      </div>
    </div>
  );
};

export default AuthModal;
