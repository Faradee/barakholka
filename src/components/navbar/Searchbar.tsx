import React from "react";
import { FaSearch } from "react-icons/fa";
import FormField from "../forms/FormField";
//TODO: LINK SEARCH TO SEARCHPARAMS
const Searchbar = () => {
  return (
    <div className="mx-5 flex h-full w-1/2 items-center justify-center rounded-xl border border-black ">
      <input
        className=" h-full w-full flex-grow rounded-xl outline-none"
        type="text"
      />
      <button className="flex h-full w-[50px] flex-grow-0 items-center justify-center border-l border-black">
        <FaSearch size={30} />
      </button>
    </div>
  );
};

export default Searchbar;
