"use client";
import Link from "next/link";
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex w-full flex-col lg:flex-row">
      <aside className="border-b-2 border-slate-400 pr-4 lg:w-[25%] lg:border-b-0 lg:border-r-2 ">
        <ul className="flex flex-row lg:flex-col">
          <li>
            <Link
              className="userOption flex cursor-pointer select-none items-center justify-center px-5 text-center"
              href="./settings"
            >
              Общая информация
            </Link>
          </li>
          <li>
            <Link
              className="userOption navButton flex cursor-pointer select-none items-center justify-center px-5 text-center"
              href={"./avatar"}
            >
              Смена аватара
            </Link>
          </li>
        </ul>
      </aside>
      <div className="relative mx-2 mb-2 lg:ml-4">{children}</div>
    </div>
  );
};

export default SettingsLayout;
