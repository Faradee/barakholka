"use client";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CarState } from "./CarForm";
import { EstateState } from "./EstateForm";
const TypeToggle = () => {
  const dispatch = useDispatch();
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const [style, setStyle] = useState<React.CSSProperties | undefined>(
    undefined,
  );
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
      trade: false,
    } as CarState;
    const initialEstateData = {
      space: "",
      rooms: "",
      floor: "",
      furniture: false,
      renovation: false,
      balcony: "",
    } as EstateState;
    switch (typeIndex) {
      case 0:
        dispatch(setPostField({ details: initialCarData }));
        break;
      case 1:
        dispatch(setPostField({ details: initialEstateData }));
      case 2:
        dispatch(setPostField({ details: undefined }));
    }
    dispatch(setPostField({ type: getTypeFromIndex(typeIndex) }));
  }, [typeIndex, dispatch]);
  useEffect(() => {
    setStyle(
      window.screen.width > 1024
        ? typeIndex === 0
          ? { left: 0 }
          : typeIndex === 1
          ? { left: "33.33%" }
          : { left: "66.66%" }
        : typeIndex === 0
        ? { top: 0 }
        : typeIndex === 1
        ? { top: "33.33%" }
        : { top: "66.66%" },
    );
  }, [typeIndex]);
  return (
    <div className=" left-1/2 flex w-full justify-center">
      <div className="relative mb-2 flex h-[7.5rem] w-1/2 bg-slate-300 lg:h-auto lg:w-[27rem]">
        <div
          className="absolute block h-10 w-full flex-col bg-slate-500 transition-all duration-300 lg:w-1/3  lg:flex-row"
          style={style}
        >
          {" "}
        </div>
        <div
          ref={buttonListRef}
          className="z-10 flex w-full flex-col lg:flex-row"
        >
          <button
            type="button"
            id="car"
            onClick={() => handleTypeToggle(0)}
            className=" h-10 w-full border-b-2 border-black lg:w-1/3 "
          >
            Машина
          </button>
          <button
            type="button"
            id="estate"
            onClick={() => handleTypeToggle(1)}
            className=" h-10 w-full border-b-2 border-black lg:w-1/3 "
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
