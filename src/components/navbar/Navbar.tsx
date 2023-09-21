"use client";
//import { toggleDim } from "@/app/redux/slices/dimSlice";
//import { useAppSelector } from "@/app/redux/store";
import { AppDispatch, store } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isNav, setNav] = useState<Boolean>(false);
  const [isDimmed, setDimmed] = useState<Boolean>(false);
  const [isAuth, setAuth] = useState<Boolean>(false);
  //const isDimmed = useAppSelector((state) => state.dimReducer.value.isDimmed);
  //const dispatch = useDispatch<AppDispatch>();

  const handleIsNav = () => {
    // dispatch(setDim());
    if (isAuth) setAuth(false);
    setDimmed(!isDimmed);
    setNav(!isNav);
    isDimmed ? (document.body.style.overflow = "auto") : (document.body.style.overflow = "hidden");
    console.log(isDimmed);
  };
  const handleDim = () => {
    setDimmed(!isDimmed);
  };
  const handleAuth = () => {
    setDimmed(true);
    setAuth(true);
    console.log(isDimmed);
  };
  const handleResize = () => {
    isDimmed && window.innerWidth > 1000
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };
  const cachedHandleResize = useCallback(handleResize, [isDimmed]);
  const buttonTitles = ["Property", "Cars", "Electronics", "Sell"];

  useEffect(() => {
    window.addEventListener("resize", cachedHandleResize);
    return () => {
      window.removeEventListener("resize", cachedHandleResize);
    };
  }, [cachedHandleResize]);
  return (
    <>
      <div
        className="fixed justify-between px-5 lg:px-64 h-20 flex w-screen lg:justify-center
       items-center bg-slate-0 py-4 z-10 bg-white "
      >
        <div className=" flex-grow lg:flex-grow-0 justify-start">
          <div className="lg:hidden flex !justify-start select-none items-center  ">
            <div className="p-2 cursor-pointer hover:bg-slate-200" onClick={handleIsNav}>
              <span
                className={`block ${
                  isNav ? "-rotate-45 translate-y-[6px]" : "rotate-0"
                } transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}
              ></span>
              <span
                className={`block ${
                  isNav ? "opacity-0" : "opacity-100"
                } transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}
              ></span>
              <span
                className={`block ${
                  isNav ? "rotate-45 translate-y-[-6px]" : "rotate-0"
                } transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}
              ></span>
            </div>
          </div>
        </div>
        <div className="flex flex-grow-1 min-w-[150px] justify-center">
          <Link href="/">
            <Image className="pr-4" src="/rea-logo.png" width="150" height="300" alt="Logo" />
          </Link>
        </div>

        <nav
          className={`fixed ${isNav ? " left-0 " : "left-[-20rem]"}
       bg-white transition-all lg:transition-none ease-out duration-200
      top-20 flex-col flex-grow-0 lg:flex-row lg:top-0 flex lg:relative
       lg:left-0  lg:justify-start z-10 h-full items-center lg:h-auto border-t-2
        border-slate-300 lg:border-t-0 w-64 lg:w-auto
     `}
        >
          {buttonTitles.map((title) => {
            return (
              <Link href={`/${title.toLowerCase()}`} key={title} className="nav-button">
                {title}
              </Link>
            );
          })}
        </nav>
        <div className="flex ml-auto justify-center flex-grow-0">
          <button onClick={handleAuth} className="!w-auto p-10 nav-button">
            Sign in
          </button>
        </div>
      </div>

      <div
        onClick={handleIsNav}
        className={`${isDimmed ? " brightness-0  opacity-70" : "hidden pointer-events-auto"}
    fixed ${!isAuth ? "lg:hidden" : "z-20"} w-full min-h-screen h-full bg-slate-300`}
      />
      {isAuth && <AuthModal />}
      <div className="w-32 h-screen"></div>
    </>
  );
};

export default Navbar;
