"use client";
import { useEffect, useState } from "react";
import TypeToggle from "@/components/postEditor/TypeToggle";
import FormField from "@/components/forms/FormField";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { setPostField, resetPostData } from "@/app/redux/slices/postSlice";
import DetailsForm from "@/components/postEditor/DetailsForm";
import LabelFormField from "@/components/forms/LabelFormField";
import { StaticImageData } from "next/image";
export type PostState = {
  posterId: string;
  title: string;
  type: "car" | "estate" | "misc";
  description: string;
  price: string;
  details?: CarState | EstateState;
  thumbnails?: (string | StaticImageData)[];
};

const PostEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { uuid } = useAppSelector((state) => state.authReducer);
  const postData = useAppSelector((state) => state.postReducer);
  const handleChange: React.Dispatch<React.SetStateAction<any>> = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(
      setPostField({
        [e.currentTarget.name]: e.currentTarget.value,
      }),
    );
  };
  useEffect(() => {
    dispatch(setPostField({ posterId: uuid }));
    return () => {
      dispatch(resetPostData());
    };
  }, [dispatch, uuid]);
  return (
    <form id="post">
      <div className="flex w-full justify-center">
        <div className="flex flex-col">
          <div className="h-[55vh] w-[30vw] bg-slate-300">thumbnail</div>
          <div className="flex h-[25vh] w-[30vw] flex-row bg-red-400">
            thumbnails
          </div>
        </div>
        <div>
          <div className="h-[80vh] w-[25vw] bg-green-400 px-10 py-5">
            <TypeToggle />
            <div className="flex flex-col items-center justify-center">
              <FormField
                type="text"
                placeholder="Заголовок объявления"
                name="title"
                useState={[postData.title, handleChange]}
                onChange={handleChange}
              />
              <LabelFormField
                type="number"
                label="Цена"
                placeholder="Цена"
                name="price"
                useState={[postData.price, handleChange]}
                onChange={handleChange}
              />
              <DetailsForm />
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
        </div>
      </div>
    </form>
  );
};

export default PostEditor;
