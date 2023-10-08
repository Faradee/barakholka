"use client";
import { useEffect, useState } from "react";
import TypeToggle from "./TypeToggle";
import FormField from "../forms/FormField";
import CarForm, { CarState } from "./CarForm";
import EstateForm, { EstateState } from "./EstateForm";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { setPostData, resetPostData } from "@/app/redux/slices/postSlice";
export type PostState = {
  posterId: string;
  title: string;
  type: "car" | "estate" | "misc";
  description: string;
  price: string;
  details?: CarState | EstateState;
};

const PostEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postData = useAppSelector((state) => state.postReducer);
  const handleChange: React.Dispatch<React.SetStateAction<any>> = (e) => {
    dispatch(
      setPostData({
        ...postData,
        [e.currentTarget.name]: e.currentTarget.value,
      }),
    );
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
  useEffect(() => {
    return () => {
      dispatch(resetPostData());
    };
  }, [dispatch]);
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <div className="h-[55vh] w-[30vw] bg-slate-300">thumbnail</div>
        <div className="flex h-[25vh] w-[30vw] flex-row bg-red-400">
          thumbnails
        </div>
      </div>
      <form>
        <div className="h-[80vh] w-[25vw] bg-green-400 px-10 py-5">
          <TypeToggle getType={getTypeFromIndex} />
          <div className="flex flex-col items-center justify-center">
            <FormField
              type="text"
              placeholder="Заголовок объявления"
              name="title"
              useState={[postData.title, handleChange]}
              onChange={handleChange}
            />
            <FormField
              type="number"
              placeholder="Цена"
              name="price"
              useState={[postData.price, handleChange]}
              onChange={handleChange}
            />
            <CarForm />
            <FormField
              type="textarea"
              placeholder="Описание объявления"
              useState={[postData.description, handleChange]}
              onChange={handleChange}
              name="description"
            />
            <button type="button" onClick={() => console.log(postData)}>
              {" "}
              hi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
