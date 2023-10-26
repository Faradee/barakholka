"use client";
import Link from "next/link";
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="border-r-2 border-slate-400 pr-4 ">
        <ul className="flex flex-row lg:flex-col">
          <li className="userOption flex cursor-pointer select-none items-center justify-center px-5 text-center">
            <Link href="./settings">Общая информация</Link>
          </li>
          <li className="userOption navButton flex cursor-pointer select-none items-center justify-center px-5 text-center">
            <Link href={"./avatar"}>Смена автара</Link>
          </li>
        </ul>
      </aside>

      {children}
    </div>
  );
};

export default SettingsLayout;
