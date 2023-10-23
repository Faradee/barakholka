"use client";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CarState } from "./CarForm";
import { EstateState } from "./EstateForm";
const TypeToggle = () => {
  const dispatch = useDispatch();
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const [style, setStyle] = useState<string>("");
  const initialCarData = {
    kilometrage: "",
    year: "",
    transmission: "",
    brand: "",
    model: "",
    color: "",
    horsepower: "",
    damaged: false,
    trade: false,
  } as CarState;
  const initialEstateData = {
    space: "",
    rooms: "",
    floor: "",
    furniture: false,
    renovation: false,
  } as EstateState;
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
  const handleTypeToggle = (childIndex: number) => {
    switch (childIndex) {
      case 0:
        dispatch(setPostField({ details: initialCarData }));
        break;
      case 1:
        dispatch(setPostField({ details: initialEstateData }));
        break;
      case 2:
        dispatch(setPostField({ details: undefined }));
        break;
    }
    dispatch(setPostField({ type: getTypeFromIndex(childIndex) }));
    setTypeIndex(childIndex);
  };
  useEffect(() => {
    setStyle(
      window.screen.width > 1024
        ? typeIndex === 0
          ? "before:left-0"
          : typeIndex === 1
          ? "before:left-1/3"
          : "before:left-2/3"
        : typeIndex === 0
        ? "before:top-0"
        : typeIndex === 1
        ? "before:top-1/3"
        : "before:top-2/3",
    );
  }, [typeIndex]);
  return (
    <div className="left-1/2 flex w-full justify-center">
      <div className="relative mb-2 flex h-[7.5rem] w-1/2 before:bg-slate-300 lg:h-auto lg:w-[27rem]">
        <div
          className={`pointer-events-auto relative flex w-full flex-col before:absolute before:-z-10 before:h-1/3 lg:before:h-full ${style} before:w-full before:bg-slate-400 before:transition-all before:duration-300 lg:flex-row lg:before:w-1/3`}
        >
          <button
            type="button"
            id="car"
            onClick={() => handleTypeToggle(0)}
            className="h-10 w-full border-b-2 border-black lg:w-1/3 "
          >
            Машина
          </button>
          <button
            type="button"
            id="estate"
            onClick={() => handleTypeToggle(1)}
            className="h-10 w-full border-b-2 border-black lg:w-1/3 "
          >
            Недвижимость
          </button>
          <button
            type="button"
            id="misc"
            onClick={() => handleTypeToggle(2)}
            className="h-10 w-full border-b-2 border-black lg:w-1/3 "
          >
            Другое
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeToggle;
