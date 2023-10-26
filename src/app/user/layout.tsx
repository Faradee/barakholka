import Link from "next/link";
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="border-r-2 border-slate-400 pr-4 ">
        <ul className="flex flex-row lg:flex-col">
          <li className="userOption flex cursor-pointer items-center justify-center px-5 text-center">
            <Link href="./settings">Общая информация</Link>
          </li>
          <li className="userOption navButton flex cursor-pointer items-center justify-center px-5 text-center">
            <Link href={"./avatar"}>Смена автара</Link>
          </li>
        </ul>
      </aside>
      <div className="mx-2 lg:ml-4">
        <div className="mb-2 p-5 shadow-md">{children}</div>
        <div className="flex">
          <div className="flex flex-grow justify-start">
            <button>Отменить</button>
          </div>
          <div className="flex flex-grow justify-end">
            <button> Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
