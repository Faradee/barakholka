"use client";
import Link from "next/link";
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="border-b-2 border-slate-400 pr-4 lg:w-[25%] lg:border-b-0 lg:border-r-2 ">
        <ul className="flex flex-row lg:flex-col">
          <li className="userOption flex cursor-pointer select-none items-center justify-center px-5 text-center">
            <Link href="./settings">Общая информация</Link>
          </li>
          <li className="userOption navButton flex cursor-pointer select-none items-center justify-center px-5 text-center">
            <Link href={"./avatar"}>Смена аватара</Link>
          </li>
        </ul>
      </aside>
      <div className="relative mx-2 mb-2 w-full lg:ml-4">{children}</div>
    </div>
  );
};

export default SettingsLayout;
