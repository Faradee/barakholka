import React, { useState } from "react";
import Image from "next/image";
import { BsFillEnvelopeFill } from "react-icons/bs";
import {
  AiOutlineClose,
  AiFillLock,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
type AuthModalProps = {
  handleDim: () => void;
};
const AuthModal = ({ handleDim }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="fixed left-1/2 top-1/2 z-30 flex h-2/3 w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-start gap-y-2 rounded-3xl bg-white px-4 py-4 lg:w-1/4 lg:px-12">
      <Image
        className=""
        src="/rea-logo.png"
        width="150"
        height="300"
        alt="Logo"
      />
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <label htmlFor="email" className="textfield">
        <BsFillEnvelopeFill />
        <input
          className="w-full outline-none"
          placeholder="Email address"
          type="email"
          id="email"
        />
      </label>
      <div className="textfield">
        <AiFillLock />
        <input
          className="w-full outline-none"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          id="password"
        />
        <div className="cursor-pointer" onClick={handleShowPassword}>
          {showPassword ? (
            <AiFillEye size={24} />
          ) : (
            <AiFillEyeInvisible size={24} />
          )}
        </div>
      </div>
      <div
        onClick={handleDim}
        className="absolute -right-12 top-0 flex h-10 w-10 cursor-pointer items-center justify-center opacity-75 hover:opacity-100"
      >
        <AiOutlineClose size={40} color="white" />
      </div>
      <button className="h-12 w-full rounded-md bg-red-600 font-semibold text-white hover:bg-red-700">
        Sign in
      </button>
      <span className="my-4 cursor-pointer font-semibold hover:underline">
        Forgot your password?
      </span>
      <div className="flex w-full items-center justify-center before:h-[1px] before:flex-grow before:bg-slate-300 before:content-[''] after:h-[1px] after:flex-grow after:bg-slate-300 after:content-['']">
        <span className="mx-2">Or</span>
      </div>
    </div>
  );
};

export default AuthModal;
