"use client";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useAppSelector } from "@/app/redux/store";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CarState } from "./CarForm";
import { EstateState } from "./EstateForm";
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
        Другое
      </button>
    </div>
  );
};

export default TypeToggle;
