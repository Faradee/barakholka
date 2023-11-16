import React from "react";
import { FaSearch } from "react-icons/fa";
const Searchbar = () => {
  return (
    <div className="relative mx-5 flex h-full w-full items-center justify-center gap-x-5 p-1">
      <input className=" h-full w-full border border-black" type="text" />
      <button>
        <FaSearch size={30} />
      </button>
    </div>
  );
};

export default Searchbar;
