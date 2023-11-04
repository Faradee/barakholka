"use client";
import { setPostField } from "@/redux/slices/postSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CarState } from "./CarForm";
import { EstateState } from "./EstateForm";
import { useAppSelector } from "@/redux/store";
const TypeToggle = () => {
  const dispatch = useDispatch();
  const postType = useAppSelector((state) => state.post.type);
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
  const handleTypeToggle = (type: typeof postType) => {
    switch (type) {
      case "car":
        dispatch(setPostField({ details: initialCarData }));
        break;
      case "estate":
        dispatch(setPostField({ details: initialEstateData }));
        break;
      case "misc":
        dispatch(setPostField({ details: undefined }));
        break;
    }
    dispatch(setPostField({ type }));
  };
  useEffect(() => {
    setStyle(
      window.screen.width > 1024
        ? postType === "car"
          ? "before:left-0 before:top-0"
          : postType === "estate"
          ? "before:left-1/3 before:top-0"
          : "before:left-2/3 before:top-0"
        : postType === "car"
        ? "before:top-0 before:left-0"
        : postType === "estate"
        ? "before:top-1/3 before:left-0"
        : "before:top-2/3 before:left-0",
    );
  }, [postType]);
  return (
    <div className="flex w-full justify-center lg:left-1/2">
      <div className="relative mb-2 flex h-[7.5rem] w-3/4 before:bg-slate-300 lg:h-auto lg:w-[27rem]">
        <div
          className={`relative flex w-full flex-col before:absolute before:-z-10 before:h-1/3 lg:before:h-full ${style} before:w-full before:bg-slate-400 before:transition-all before:duration-300 lg:flex-row lg:before:w-1/3`}
        >
          <button
            type="button"
            id="car"
            onClick={() => handleTypeToggle("car")}
            className="h-full w-full border-b-2 border-black lg:w-1/3 "
          >
            Машина
          </button>
          <button
            type="button"
            id="estate"
            onClick={() => handleTypeToggle("estate")}
            className="h-full w-full border-b-2 border-black lg:w-1/3 "
          >
            Недвижимость
          </button>
          <button
            type="button"
            id="misc"
            onClick={() => handleTypeToggle("misc")}
            className="h-full w-full border-b-2 border-black lg:w-1/3 "
          >
            Другое
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeToggle;
