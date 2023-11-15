import React from "react";

export const handleBlur =
  (setState: React.Dispatch<React.SetStateAction<boolean>>) =>
  (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setState(false);
  };

const DropDownContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="container absolute right-0 top-[90%] z-10 mx-auto mt-2 w-[300px] cursor-auto rounded-md border bg-white p-2 shadow-md">
      {children}
    </div>
  );
};

export default DropDownContainer;
