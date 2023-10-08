"use client";
import { setPostData } from "@/app/redux/slices/postSlice";
import { useAppSelector } from "@/app/redux/store";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

const TypeToggle = () => {
  const dispatch = useDispatch();
  const postData = useAppSelector((state) => state.postReducer);
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const buttonListRef = useRef<HTMLDivElement>(null);
  const handleTypeToggle = (childIndex: number) => {
    if (buttonListRef.current) {
      const children = buttonListRef.current.children;
      children[typeIndex].classList.remove("active");

      children[childIndex].classList.add("active");
      setTypeIndex(childIndex);
      dispatch(
        setPostData({ ...postData, type: getTypeFromIndex(childIndex) }),
      );
    }
  };
  const getTypeFromIndex = (typeIndex: number) => {
    switch (typeIndex) {
      case 0:
        return "car";
      case 1:
        return "estate";
      case 2:
        return "misc";
      default:
        return "car";
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
        Машина
      </button>
      <button
        type="button"
        id="estate"
        onClick={() => handleTypeToggle(1)}
        className="w-36 border-b-2 border-black bg-slate-200"
      >
        Недвижимость
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
