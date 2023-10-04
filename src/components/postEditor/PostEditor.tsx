"use client";
import { useState, useRef } from "react";

const PostEditor = () => {
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const buttonListRef = useRef<HTMLDivElement>(null);
  const handleTypeToggle = (childIndex: number) => {
    if (buttonListRef.current) {
      const children = buttonListRef.current.children;
      children[typeIndex].classList.remove("active");
      children[childIndex].classList.add("active");
      setTypeIndex(childIndex);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <div className="h-[55vh] w-[30vw] bg-slate-300">thumbnail</div>
        <div className="flex h-[25vh] w-[30vw] flex-row bg-red-400">
          thumbnails
        </div>
      </div>
      <form>
        <div className="h-[80vh] w-[25vw] justify-center bg-green-400">
          <div ref={buttonListRef} className="flex justify-center">
            <button
              type="button"
              id="car"
              onClick={() => handleTypeToggle(0)}
              className="active w-36 border-b-2 border-black bg-slate-200"
            >
              Недвижимость
            </button>
            <button
              type="button"
              id="estate"
              onClick={() => handleTypeToggle(1)}
              className="w-36 border-b-2 border-black bg-slate-200"
            >
              Машина
            </button>
            <button
              type="button"
              id="misc"
              onClick={() => handleTypeToggle(2)}
              className="w-36 border-b-2 border-black bg-slate-200"
            >
              Вещи
            </button>
          </div>
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
