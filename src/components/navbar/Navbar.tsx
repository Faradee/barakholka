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
import { setDim, toggleDim } from "@/app/redux/slices/dimSlice";
import DimOverlay from "../DimOverlay";

type Button = {
  title: string;
  url: string;
};
// ADD SEARCH PARAM AUTH STATE
const Navbar = () => {
  const router = useRouter();
  // const params = useSearchParams();
  // const pathname = usePathname();
  const [isNav, setNav] = useState<boolean>(false);

  const [isAuth, setAuth] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useAppSelector((state) => state.authReducer);
  const isDimmed = useAppSelector((state) => state.dimReducer.isDimmed);

  //on nav button press
  const handleIsNav = () => {
    dispatch(toggleDim());
    setNav(!isNav);
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
    dispatch(toggleDim());
    setAuth(true);
    document.body.style.overflow = "hidden";
  }, [dispatch]);

  const handleResize = () => {
    if (isDimmed && isNav && window.innerWidth > 1000) {
      document.body.style.overflow = "auto";
      setNav(false);
      dispatch(toggleDim());
    }
  };

  const cachedHandleResize = useCallback(handleResize, [
    isDimmed,
    isNav,
    dispatch,
  ]);
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
  useEffect(() => {
    window.addEventListener("resize", cachedHandleResize);
    return () => {
      window.removeEventListener("resize", cachedHandleResize);
    };
  }, [cachedHandleResize]);
  return (
    <>
      <nav
        className={`fixed ${
          isNav ? "z-30" : "z-20"
        } flex h-20 w-full items-center justify-between overflow-hidden bg-white px-5
       py-4 lg:z-10 lg:justify-center lg:px-64 lg:shadow-md `}
      >
        <div className="flex justify-start lg:hidden">
          <HamburgerIcon onClick={handleIsNav} active={isNav} />
        </div>
        <Link className="flex-grow-0 justify-center" href="/">
          <Image
            className="pr-4"
            src="/rea-logo.png"
            width="150"
            height="200"
            alt="Logo"
          />
        </Link>

        <ul
          className={`fixed ${isNav ? " left-0 " : "left-[-20rem]"}
        top-20 flex h-full w-64 flex-grow flex-col
        items-center border-t-2 border-slate-300 bg-white transition-all duration-200 
        ease-out  lg:relative lg:left-0 lg:top-0 lg:h-auto lg:w-auto
        lg:flex-row lg:justify-start lg:border-t-0 lg:transition-none 
      `}
        >
          {buttons.map((button) => {
            return (
              <li
                className="flex w-full justify-center lg:w-auto"
                onClick={() => dispatch(setDim(false))}
                key={button.url}
              >
                <Link
                  href={`/${button.url.toLowerCase()}`}
                  className="nav-button"
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
            <button onClick={toggleAuthModal} className="nav-button p-5">
              Вход
            </button>
          ) : (
            <button onClick={handleSignOut} className="nav-button p-5">
              Выйти
            </button>
          )}
        </div>
      </nav>
      {isAuth && <AuthModal />}
      <DimOverlay />
      <span className="mb-5 block h-20 w-full overflow-hidden" />
    </>
  );
};

export default Navbar;
