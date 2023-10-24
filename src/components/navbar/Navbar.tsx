"use client";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { signOut } from "@/app/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import AuthModal from "./AuthModal";
import logo from "/public/rea-logo.png";
import { redirect } from "next/navigation";
import HamburgerIcon from "./HamburgerIcon";
import { setDim, toggleDim } from "@/app/redux/slices/dimSlice";
import DimOverlay from "../DimOverlay";
import { signUserOut } from "@/actions";
import styles from "./styles.module.css";
type Button = {
  title: string;
  url: string;
};
// ADD SEARCH PARAM AUTH STATE
const Navbar = () => {
  const [isNav, setNav] = useState<boolean>(false);

  const [isAuth, setAuth] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useAppSelector((state) => state.auth);
  const isDimmed = useAppSelector((state) => state.dim.isDimmed);

  //on nav button press
  const handleIsNav = () => {
    dispatch(toggleDim());
    setNav(!isNav);
    isDimmed
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };
  const handleSignOut = () => {
    signUserOut();
    dispatch(signOut());
    redirect("/");
  };
  //on auth button press
  const toggleAuthModal = useCallback(() => {
    setNav(false);
    dispatch(setDim(true));
    setAuth(true);
    document.body.style.overflow = "hidden";
  }, [dispatch]);
  const buttons = [
    // { title: "Недвижимость", url: "estate" },
    // { title: "Авто", url: "car" },
    // { title: "Другое", url: "misc" },
    { title: "Создать объявление", url: "create" },
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
          isNav ? "z-30" : "z-20"
        } flex h-20 w-full items-center justify-between overflow-hidden bg-white px-5
       py-4 lg:shadow-md `}
      >
        <div className="flex justify-start">
          <HamburgerIcon onClick={handleIsNav} active={isNav} />
          <Link
            className="relative  h-[35px] w-[150px] flex-grow-0 justify-center"
            href="/"
          >
            <Image
              className="pr-4"
              src={logo}
              sizes="100px"
              alt="Logo"
              placeholder="blur"
              fill
            />
          </Link>
        </div>

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
                  className={styles.navButton}
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
        <div className="items-center justify-center lg:justify-end">
          {userData.name === "" ? (
            <button
              onClick={toggleAuthModal}
              className={`${styles.navButton} p-5`}
            >
              Вход
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className={`${styles.navButton} p-5`}
            >
              Выйти
            </button>
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
