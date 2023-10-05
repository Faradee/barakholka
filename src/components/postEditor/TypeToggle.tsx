"use client";
import { useRef } from "react";
type TypeToggleProps = {
  typeIndex: number;
  setTypeIndex: React.Dispatch<React.SetStateAction<number>>;
};
const TypeToggle = (props: TypeToggleProps) => {
  const { typeIndex, setTypeIndex } = props;
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
  );
};

export default TypeToggle;
