"use client";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import defaultUserImage from "/public/Default_pfp.png";
import styles from "./styles.module.css";
import { useState, Suspense, useEffect } from "react";
import { signIn, signOut } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchUser } from "@/actions/userActions";
import Skeleton from "react-loading-skeleton";
const Usermenu = () => {
  const userData = useAppSelector((state) => state.auth);
  const { uuid } = userData;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const handleSignOut = () => {
    dispatch(signOut());
    router.replace("/");
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsMenu(false);
  };
  useEffect(() => {
    const setUser = async () => {
      const newUser = await fetchUser(uuid);
      if (newUser) dispatch(signIn(newUser));
      else dispatch(signOut());
    };
    setUser();
  }, [uuid, dispatch]);
  return (
    <div onBlur={(e) => handleBlur(e)} tabIndex={0}>
      <div className="relative h-[3rem] min-w-[3rem] cursor-pointer rounded-full bg-slate-400 outline-1 outline-blue-400 active:outline">
        <Image
          onClick={() => setIsMenu(true)}
          src={defaultUserImage}
          sizes="100%"
          fill
          alt="user avatar"
        />
      </div>
      {isMenu && (
        <div
          className={`container absolute top-[90%] z-20 mx-auto w-[300px] -translate-x-[calc(80%)] bg-slate-100 p-2 shadow-md `}
        >
          <div className="mb-2 flex">
            <div className="relative mr-2 max-h-[3rem] min-w-[3rem] rounded-full bg-slate-400">
              <Image
                onClick={() => setIsMenu(true)}
                src={defaultUserImage}
                sizes="100%"
                fill
                alt="user avatar"
              />
            </div>
            <div className="flex flex-col">
              {userData && (
                <>
                  <Suspense fallback={<Skeleton />}>
                    <span>{userData.name}</span>
                  </Suspense>
                  <Suspense fallback={<Skeleton />}>
                    <span>{userData.email}</span>
                  </Suspense>
                </>
              )}
            </div>
          </div>
          <ul className={`${styles.list}`} tabIndex={1}>
            <li onClick={() => setIsMenu(false)}>
              <Link className={`${styles.navButton}`} href={"/user/settings"}>
                Настройки аккаунта
              </Link>
            </li>
            <li className={`${styles.navButton}`} onClick={handleSignOut}>
              Выйти
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
