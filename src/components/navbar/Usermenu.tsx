"use client";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import defaultUserImage from "/public/Default_pfp.png";
import styles from "./styles.module.css";
import { useState } from "react";
import { signOut } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Usermenu = () => {
  const userData = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const handleSignOut = () => {
    dispatch(signOut());
    router.replace("/");
  };
  return (
    <div
      tabIndex={0}
      onBlur={() => setIsMenu(false)}
      onClick={() => setIsMenu(true)}
    >
      <div className="relative h-[50px] w-[50px] cursor-pointer rounded-full bg-slate-400 outline-1 outline-blue-400 active:outline">
        <Image src={defaultUserImage} sizes="100%" fill alt="user avatar" />
      </div>
      {isMenu && (
        <ul
          className={`absolute top-[90%] z-20 min-w-[200px] -translate-x-[calc(50%+50px)] rounded-xl bg-slate-300 ${styles.list}`}
        >
          <li>
            <Link href="/user/settings">Настройки аккаунта</Link>
          </li>
          <li onClick={handleSignOut}>Выйти</li>
        </ul>
      )}
    </div>
  );
};

export default Usermenu;
