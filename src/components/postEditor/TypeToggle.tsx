"use client";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CarState } from "./CarForm";
import { EstateState } from "./EstateForm";
const TypeToggle = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
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
    const initialCarData = {
      kilometrage: "",
      year: "",
      transmission: "",
      brand: "",
      model: "",
      color: "",
      horsepower: "",
      damaged: false,
    } as CarState;
    const initialEstateData = {
      space: "",
      rooms: "",
      floor: "",
      furniture: false,
      renovation: "",
      balcony: "",
      type: "",
    } as EstateState;
    switch (typeIndex) {
      case 0:
        dispatch(setPostField({ details: initialCarData }));
        break;
      case 1:
        dispatch(setPostField({ details: initialEstateData }));
    }
    dispatch(setPostField({ type: getTypeFromIndex(typeIndex) }));
  }, [typeIndex, dispatch]);
  return (
    <div className=" left-1/2 flex w-full justify-center">
      <div className="relative mb-2 flex h-[7.5rem] bg-slate-300 lg:h-auto lg:w-[27rem]">
        <div
          className="relative block h-10 w-36 flex-col bg-slate-500 transition-all duration-300 lg:w-36 lg:flex-row"
          style={
            screen.width > 1024
              ? typeIndex === 0
                ? { left: 0 }
                : typeIndex === 1
                ? { left: "33.33%" }
                : { left: "66.66%" }
              : typeIndex === 0
              ? { top: 0 }
              : typeIndex === 1
              ? { top: "33.33%" }
              : { top: "66.66%" }
          }
        >
          {" "}
        </div>
        <div className="absolute flex flex-col lg:flex-row">
          <div ref={buttonListRef} className="flex flex-col lg:flex-row">
            <button
              type="button"
              id="car"
              onClick={() => handleTypeToggle(0)}
              className=" h-10 w-36 border-b-2 border-black "
            >
              Машина
            </button>
            <button
              type="button"
              id="estate"
              onClick={() => handleTypeToggle(1)}
              className=" h-10 w-36 border-b-2 border-black "
            >
              Недвижимость
            </button>
            <button
              type="button"
              id="misc"
              onClick={() => handleTypeToggle(2)}
              className="h-10 w-36 border-b-2 border-black "
            >
              Другое
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeToggle;
