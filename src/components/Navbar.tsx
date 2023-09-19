"use client";
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from 'react';
const toggleSidebar = () => {};

const Navbar = () => {
  const [showNav, setNav] = useState<Boolean>(false);
  const handleShowNav = () => {
    setNav(!showNav);
    console.log(showNav);
  }
  return (
    <>
    <div className="flex mx-auto lg:justify-center items-center py-4">
      <div 
        className="lg:hidden float-left select-none h-full nav-button flex pr-10 cursor-pointer"
        onClick={handleShowNav}
      >
        <div  className=" mr-5">
          <span className={`block ${showNav ? "-rotate-45 translate-y-[6px]" : "rotate-0"} transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}></span>
          <span className={`block ${showNav ? "opacity-0" : "opacity-100"} transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}></span>
          <span className={`block ${showNav ? "rotate-45 translate-y-[-6px]" : "rotate-0"} transition-all ease-out duration-300 h-[2px] w-[20px] mb-1 bg-slate-800`}></span>
        </div>
        <div>Menu</div>
      </div>
      <Link href="/">
        <Image
          className="pr-4"
          src="/rea-logo.png"
          width="300"
          height="300"
          alt="Logo"
        />
      </Link>
      <nav
        className="absolute bg-slate-100 transition-transform ease-out duration-300
     left-[-20rem] h-full top-0 w-80 lg:flex lg:relative lg:left-0 lg:w-full justify-start
     "
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
      <div className="flex ml-auto">
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
    </>
  );
};

export default Navbar;
