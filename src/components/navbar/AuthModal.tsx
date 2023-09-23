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
  const dispatch = useDispatch<AppDispatch>();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.currentTarget as Element;
    eventTarget.querySelector("input")?.focus();
    eventTarget.classList.add("ring-1");
    eventTarget.classList.add("!border-black");
  };
  const handleFocusOut = (e: React.FocusEvent<HTMLDivElement>) => {
    const eventTarget = e.currentTarget as Element;
    eventTarget.classList.remove("ring-1");
    eventTarget.classList.remove("!border-black");
  };
  const handleToggle = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const handleSignIn = async () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    } as UserData;
    const fetchUser = await signUser(userData);
    if (fetchUser !== null) {
      dispatch(signIn({ ...userData, name: signUser.name }));
      handleDim();
    }
  };

  const handleSignUp = async () => {
    if (confirmPass === password) {
      const userData = {
        name: name,
        email: email,
        password: password,
      } as UserData;
      await createUser(userData);
      dispatch(signIn(userData));
      handleDim();
    }
  };

  return (
    <div className="fixed left-1/2 top-1/2 z-30 flex  w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-start gap-y-2 rounded-3xl bg-white px-4 py-4 lg:w-1/4 lg:px-12">
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
      <form>
        {isSignup && (
          <div
            onClick={(e) => handleClick(e)}
            onBlur={(e) => handleFocusOut(e)}
            className="textfield"
          >
            <input
              className="w-full outline-none"
              placeholder="Полное имя"
              type="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div
          onClick={(e) => handleClick(e)}
          onBlur={(e) => handleFocusOut(e)}
          className="textfield"
        >
          <div>
            <BsFillEnvelopeFill onClick={() => handleClick} />
          </div>
          <input
            className="w-full outline-none"
            placeholder="Email адрес"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          onClick={(e) => handleClick(e)}
          onBlur={(e) => handleFocusOut(e)}
          className="textfield"
        >
          <AiFillLock />
          <input
            className="w-full outline-none"
            placeholder="Пароль"
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isSignup && (
            <div className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <AiFillEye size={24} />
              ) : (
                <AiFillEyeInvisible size={24} />
              )}
            </div>
          )}
        </div>
        {isSignup && (
          <div
            onClick={(e) => handleClick(e)}
            onBlur={(e) => handleFocusOut(e)}
            className="textfield"
          >
            <input
              className="w-full outline-none"
              placeholder="Подтвердите пароль"
              type={showPassword ? "text" : "password"}
              id="confirmPass"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        )}
        <button
          type="button"
          onClick={isSignup ? handleSignUp : handleSignIn}
          className="h-12 w-full rounded-md bg-red-600 font-semibold text-white hover:bg-red-700 active:bg-red-800"
        >
          {isSignup ? "Создать аккаунт" : "Войти"}
        </button>
      </form>
      {/* <span className="my-2 cursor-pointer font-semibold text-blue-600 hover:underline">
        Забыли пароль?
      </span> */}
      <div className="flex w-full items-center justify-center before:h-[1px] before:flex-grow before:bg-slate-300 before:content-[''] after:h-[1px] after:flex-grow after:bg-slate-300 after:content-['']">
        <span className="mx-2">Или</span>
      </div>
      <div>
        {isSignup ? "Есть аккаунт? " : "Не зарегистрированы? "}
        <span
          onClick={handleToggle}
          className="cursor-pointer font-semibold text-blue-600 hover:underline"
        >
          {isSignup ? "Войдите" : "Создайте аккаунт"}
        </span>
      </div>
    </div>
  );
};

export default AuthModal;
