import React from "react";

const DropDownContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="container absolute top-[90%] z-20 mx-auto w-[300px] -translate-x-[calc(80%)] bg-slate-100 p-2 shadow-md">
      {children}
    </div>
  );
};

export default DropDownContainer;
