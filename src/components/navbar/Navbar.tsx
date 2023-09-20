"use client";
import { toggleDim } from "@/app/redux/slices/dimSlice";
import { AppDispatch, store } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/store";

const Navbar = () => {
  const initialState = {
    value: {
      isDimmed: false,
    },
  };
  const [showNav, setNav] = useState<Boolean>(false);
  const isDimmed = useAppSelector((state) => state.dimReducer.value.isDimmed);
  const dispatch = useDispatch<AppDispatch>();
  const handleShowNav = () => {
    dispatch(toggleDim());
    setNav(!showNav);
    isDimmed ? (document.body.style.overflow = "auto") : (document.body.style.overflow = "hidden");
    console.log(isDimmed);
  };
  const handleResize = () => {
    window.innerWidth > 1000 ? (document.body.style.overflow = "auto") : (document.body.style.overflow = "hidden");
  };

  const buttonTitles = ["Property", "Cars", "Electronics", "Sell"];
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        className="fixed justify-between px-5 lg:px-36 lg:container h-20 flex w-screen lg:justify-center
       items-center bg-slate-0 py-4 z-10 bg-white "
      >
        <div className=" flex-grow justify-start">
          <div className="lg:hidden flex !justify-start select-none items-center  ">
            <div className="p-2 cursor-pointer hover:bg-slate-200" onClick={handleShowNav}>
              <span
                className={`block ${
                  showNav ? "-rotate-45 translate-y-[6px]" : "rotate-0"
                } transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}
              ></span>
              <span
                className={`block ${
                  showNav ? "opacity-0" : "opacity-100"
                } transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}
              ></span>
              <span
                className={`block ${
                  showNav ? "rotate-45 translate-y-[-6px]" : "rotate-0"
                } transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}
              ></span>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-grow">
          <Link href="/">
            <Image className="pr-4" src="/rea-logo.png" width="150" height="300" alt="Logo" />
          </Link>
        </div>

        <nav
          className={`fixed ${isDimmed ? " left-0 " : "left-[-20rem]"}
       bg-white transition-transform ease-out duration-300
      top-20 flex-col flex-grow-0 lg:flex-row lg:top-0 flex lg:relative
       lg:left-0  lg:justify-start z-10 h-full items-center lg:h-auto border-t-2
        border-slate-300 lg:border-t-0 mr-16 w-64 lg:w-auto
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
        <div className="flex ml-auto justify-end flex-grow">
          <Link href="/buy" className="nav-button">
            Sign in
          </Link>
          {/* <Link href="/sell" className="nav-button bg-red-600">
            Login
          </Link> */}
        </div>
      </div>

      <div
        onClick={handleShowNav}
        className={`${isDimmed ? " brightness-0  opacity-70" : "hidden pointer-events-auto"}
    fixed lg:hidden w-full min-h-screen h-full bg-slate-300 z-0`}
      />
      <div className="w-32 h-screen"></div>
    </>
  );
};

export default Navbar;
