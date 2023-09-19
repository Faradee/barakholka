"use client";
import { toggleDim } from "@/app/redux/slices/dimSlice";
import { AppDispatch, store } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import { useAppSelector } from "@/app/redux/store";

const Navbar = () => {
  const initialState = {
    value: {
      isDimmed: false,
    },
  }
  const [showNav, setNav] = useState<Boolean>(false);
  const isDimmed = useAppSelector((state)=>state.dimReducer.value.isDimmed);
  const dispatch =useDispatch<AppDispatch>();
  const handleShowNav = () => {
    dispatch(toggleDim())
    setNav(!showNav);
    
    console.log(isDimmed);
  };
  return (
    <>
      <div className="relative justify-between px-5 lg:container lg:mx-auto  h-20 flex w-full lg:justify-center items-center bg-slate-0 py-4">
        <div
          className=" flex-grow"
          
        >
          <div className="lg:hidden justify-start select-none h-full items-center nav-button cursor-pointer" onClick={handleShowNav}>
          <div className="mr-4">
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
          <div>Menu</div>
          </div>
        </div>
        <div className="flex justify-center flex-grow">
          <Link href="/">
            <Image
              className="pr-4"
              src="/rea-logo.png"
              width="200"
              height="300"
              alt="Logo"
            />
          </Link>
        </div>

        <nav
          className={`absolute ${
            isDimmed ? " left-0 " : "left-[-20rem]"
          } bg-white transition-transform ease-out duration-300
      top-20 flex-col flex-grow-0 lg:flex-row lg:flex-grow lg:top-0 flex lg:relative
       lg:left-0 lg:w-full lg:justify-start z-10
     `}
        >
          <Link href="/buy" className="nav-button">
            {" "}
            Buy
          </Link>
          <Link href="/sell" className="nav-button">
            {" "}
            Sell
          </Link>
          <Link href="/rent" className="nav-button">
            {" "}
            Rent
          </Link>
          <Link href="/land" className="nav-button">
            {" "}
            Land
          </Link>
          <Link href="/commercial" className="nav-button">
            {" "}
            Commercial
          </Link>
        </nav>
        <div className="flex ml-auto justify-end flex-grow">
          <Link href="/buy" className="nav-button">
            {" "}
            Sign in
          </Link>
          <Link href="/sell" className="nav-button bg-red-600">
            {" "}
            Login
          </Link>
        </div>
      </div>
      <div
        className={`${
          isDimmed
            ? " brightness-0 pointer-events-none opacity-70"
            : "hidden pointer-events-auto"
        }
    absolute lg:hidden w-full min-h-screen bg-slate-300`}
      />
    </>
  );
};

export default Navbar;
