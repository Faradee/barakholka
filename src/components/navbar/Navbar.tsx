"use client";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { signOut } from "@/app/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";
import HamburgerIcon from "./HamburgerIcon";

type Button = {
  title: string;
  url: string;
};
const Navbar = () => {
  const router = useRouter();
  const [isNav, setNav] = useState<boolean>(false);
  const [isDimmed, setDimmed] = useState<boolean>(false);
  const [isAuth, setAuth] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useAppSelector((state) => state.authReducer);

  //on nav button press
  const handleIsNav = () => {
    setDimmed(!isDimmed);
    setNav(!isNav);
    isDimmed
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };

  //on dim overlay press
  const handleDim = () => {
    setDimmed(!isDimmed);
    setNav(false);
    setAuth(false);
    isDimmed
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };

  const handleSignOut = () => {
    dispatch(signOut());
    router.replace("/");
  };
  //on auth button press
  const toggleAuthModal = useCallback(() => {
    setNav(false);
    setDimmed(true);
    setAuth(true);
    document.body.style.overflow = "hidden";
  }, []);

  const handleResize = () => {
    if (isDimmed && isNav && window.innerWidth > 1000) {
      document.body.style.overflow = "auto";
      setNav(false);
      setDimmed(false);
    }
  };

  const cachedHandleResize = useCallback(handleResize, [isDimmed, isNav]);
  const buttons = [
    { title: "Недвижимость", url: "estate" },
    { title: "Авто", url: "car" },
    { title: "Вещи", url: "misc" },
    { title: "Создать объявление", url: "create" },
  ] as Button[];

  useEffect(() => {
    window.addEventListener("resize", cachedHandleResize);
    return () => {
      window.removeEventListener("resize", cachedHandleResize);
    };
  }, [cachedHandleResize]);
  return (
    <>
      <div
        className="fixed z-10 flex h-20 w-screen items-center justify-between
       bg-white px-5 py-4 lg:justify-center lg:px-64 lg:shadow-md "
      >
        <div className="flex justify-start lg:hidden">
          <HamburgerIcon onClick={handleIsNav} active={isNav} />
        </div>
        <div className="min-w-[150px] flex-grow-0 justify-center">
          <Link href="/">
            <Image
              className="pr-4"
              src="/rea-logo.png"
              width="150"
              height="300"
              alt="Logo"
            />
          </Link>
        </div>

        <nav
          className={`fixed ${isNav ? " left-0 " : "left-[-20rem]"}
        top-20 z-10 flex h-full w-64 flex-grow flex-col items-center
        border-t-2 border-slate-300 bg-white transition-all 
        duration-200  ease-out lg:relative lg:left-0 lg:top-0 lg:h-auto lg:w-auto
        lg:flex-row lg:justify-start lg:border-t-0 lg:transition-none 
      `}
        >
          {buttons.map((button) => {
            return (
              <Link
                href={`/${button.url.toLowerCase()}`}
                key={button.url}
                className="nav-button"
              >
                {button.title}
              </Link>
            );
          })}
        </nav>
        <div className="items-center justify-center lg:justify-end">
          {userData.name === "" ? (
            <button onClick={toggleAuthModal} className="nav-button">
              Вход
            </button>
          ) : (
            <button onClick={handleSignOut} className="nav-button">
              Выйти
            </button>
          )}
        </div>
      </div>
      {isAuth && <AuthModal handleDim={handleDim} />}
      <div
        onClick={handleDim}
        className={`${
          isDimmed ? " opacity-70  brightness-0" : "pointer-events-auto hidden"
        }
    fixed ${
      !isAuth ? "lg:hidden" : "z-20"
    } h-full min-h-screen w-full bg-slate-300`}
      />
      <span className="mb-4 block h-20 w-full" />
    </>
  );
};

export default Navbar;
