"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import AuthModal from "./AuthModal";
import logo from "/public/rea-logo.webp";
import HamburgerIcon from "./HamburgerIcon";
import { setDim, toggleDim } from "@/redux/slices/dimSlice";
import DimOverlay from "../DimOverlay";
import styles from "./styles.module.css";
import Usermenu from "./Usermenu";
import { IconType } from "react-icons";
import Searchbar from "./Searchbar";
type Button = {
  title: string;
  url: string;
  icon?: IconType;
};
const Navbar = () => {
  const [isNav, setNav] = useState<boolean>(false);
  const [isAuth, setAuth] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useAppSelector((state) => state.auth);
  const isDimmed = useAppSelector((state) => state.dim.isDimmed);

  const handleIsNav = () => {
    dispatch(toggleDim());
    setNav(!isNav);
    isDimmed
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };
  const toggleAuthModal = useCallback(() => {
    setNav(false);
    dispatch(setDim(true));
    setAuth(true);
    document.body.style.overflow = "hidden";
  }, [dispatch]);
  const buttons = [
    {
      title: "Создать объявление",
      url: "create",
    },
    { title: "Избранное", url: "?favorites=user" },
    { title: "Мои объявления", url: "?posts=user" },
  ] as Button[];

  useEffect(() => {
    if (!isDimmed) {
      setNav(false);
      setAuth(false);
      document.body.style.overflow = "auto";
    } else document.body.style.overflow = "hidden";
  }, [isDimmed]);
  return (
    <>
      <nav
        className={`fixed ${
          isNav ? "z-40" : "z-20"
        } flex h-20 w-full items-center justify-between bg-white px-5
       py-4 lg:shadow-md `}
      >
        <div className="flex justify-start md:w-1/4">
          <HamburgerIcon onClick={handleIsNav} active={isNav} />
          <Link
            className="relative  h-[35px] w-[150px] flex-grow-0 justify-center"
            href="/"
            prefetch={false}
          >
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        <Searchbar />

        <ul
          className={`fixed ${isNav ? " left-0 " : "left-[-20rem]"}
        top-20 flex h-full w-64 flex-grow flex-col
        items-center border-t-2 border-slate-300 bg-white transition-all duration-200 
        ease-out
      `}
        >
          {buttons.map((button) => {
            return (
              <li
                className="flex w-full justify-center"
                onClick={() => dispatch(setDim(false))}
                key={button.url}
              >
                <Link
                  href={`/${button.url.toLowerCase()}`}
                  className={`${styles.navButton} flex justify-center gap-x-2 px-2`}
                  style={
                    userData.uuid
                      ? { pointerEvents: "auto" }
                      : { pointerEvents: "none", color: "gray" }
                  }
                >
                  {button.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-end md:w-1/4">
          {userData.uuid === "" ? (
            <div className="w-24">
              <button
                onClick={toggleAuthModal}
                className={`${styles.navButton} p-5`}
              >
                Вход
              </button>
            </div>
          ) : (
            <Usermenu />
          )}
        </div>
      </nav>
      {isAuth && <AuthModal />}
      <DimOverlay />
      <span className="block h-20 w-full overflow-hidden" />
    </>
  );
};

export default Navbar;
