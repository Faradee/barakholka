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
import { AppDispatch } from "@/app/redux/store";
import { UserData, createUser, signUser } from "@/serverActions";
import FormField from "../forms/FormField";
type AuthModalProps = {
  handleDim: () => void;
};

const AuthModal = ({ handleDim }: AuthModalProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentialsWarning, setCredentialsWarning] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggle = () => {
    setIsSignup(!isSignup);
    setCredentialsWarning(false);
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setName("");
    setShowPassword(false);
  };
  const handleSignIn = async () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    } as UserData;
    const fetchedUser = await signUser(userData);
    if (fetchedUser) {
      dispatch(signIn({ ...userData, name: signUser.name }));
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
      await createUser(userData);
      dispatch(signIn(userData));
      handleDim();
    } else setCredentialsWarning(true);
  };
  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(e.currentTarget.value);
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
            useState={[name, setName]}
            type="text"
            placeholder="Полное имя"
            onChange={handleChange}
          />
        )}
        <FormField
          placeholder="Email адрес"
          type="email"
          onChange={handleChange}
          icon={BsFillEnvelopeFill}
          useState={[email, setEmail]}
        />
        <FormField
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          useState={[password, setPassword]}
          onChange={handleChange}
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
            useState={[confirmPass, setConfirmPass]}
            placeholder="Подтвердите пароль"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
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
