"use client";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import defaultUserImage from "/public/Default_pfp.png";
import styles from "./styles.module.css";
import { useState, Suspense, useEffect, memo } from "react";
import { signIn, signOut } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchUser, getAvatar, signUserOut } from "@/actions/userActions";
import Skeleton from "react-loading-skeleton";
import { resetAvatar, setAvatar } from "@/redux/slices/avatarSlice";
import DropDownContainer from "../containers/DropDownContainer";
const Usermenu = () => {
  const userData = useAppSelector((state) => state.auth);
  const avatar = useAppSelector((state) => state.avatar.avatar);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenu, setIsMenu] = useState<boolean>(true);
  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetAvatar());
    signUserOut();
    router.replace("/");
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsMenu(false);
  };
  useEffect(() => {
    const setUser = async () => {
      const newUser = await fetchUser();
      if (newUser) {
        dispatch(signIn(newUser));
        const avatar = await getAvatar();
        if (avatar) {
          dispatch(setAvatar(avatar));
        }
      } else dispatch(signOut());
    };
    setUser();
  }, [dispatch]);
  return (
    <div onBlur={(e) => handleBlur(e)} tabIndex={0}>
      <div className="poop relative h-[3rem] min-w-[3rem] cursor-pointer overflow-hidden rounded-full bg-slate-400 outline-1 outline-blue-400 active:outline">
        <Suspense fallback={<Skeleton />}>
          <Image
            onClick={() => setIsMenu(true)}
            src={avatar ? avatar : defaultUserImage}
            sizes="100%"
            width={48}
            height={48}
            alt="user avatar"
          />
        </Suspense>
      </div>
      {isMenu && (
        <DropDownContainer>
          <>
            <div className="mb-2 flex">
              <div className="relative mr-2 max-h-[3rem] min-w-[3rem] overflow-hidden rounded-full bg-slate-400">
                <Suspense fallback={<Skeleton />}>
                  <Image
                    onClick={() => setIsMenu(true)}
                    src={avatar ? avatar : defaultUserImage}
                    sizes="100%"
                    width={48}
                    height={48}
                    alt="user avatar"
                  />
                </Suspense>
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
                <span>Выйти</span>
              </li>
            </ul>
          </>
        </DropDownContainer>
      )}
    </div>
  );
};

export default memo(Usermenu);
