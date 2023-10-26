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
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsMenu(false);
  };
  return (
    <div onBlur={(e) => handleBlur(e)} tabIndex={0}>
      <div className="relative h-[3rem] w-[3rem] cursor-pointer rounded-full bg-slate-400 outline-1 outline-blue-400 active:outline">
        <Image
          onClick={() => setIsMenu(true)}
          src={defaultUserImage}
          sizes="100%"
          fill
          alt="user avatar"
        />
      </div>
      {isMenu && (
        <ul
          tabIndex={1}
          className={`absolute top-[90%] z-20 min-w-[200px] -translate-x-[calc(50%+3rem)] bg-slate-200 ${styles.list}`}
        >
          <li
            onClick={() => setIsMenu(false)}
            className={`${styles.navButton}`}
          >
            <Link href={"/user/settings"}>Настройки аккаунта</Link>
          </li>
          <li className={`${styles.navButton}`} onClick={handleSignOut}>
            Выйти
          </li>
        </ul>
      )}
    </div>
  );
};

export default Usermenu;
