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
import Gallery from "@/components/postEditor/Gallery";
import UploadableWrapper from "@/components/forms/UploadableWrapper";
export type PostState = {
  posterId: string;
  title: string;
  type: "car" | "estate" | "misc";
  description: string;
  price: string;
  details?: CarState | EstateState;
  thumbnails?: string[];
};

const PostEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { uuid } = useAppSelector((state) => state.authReducer);
  const postData = useAppSelector((state) => state.postReducer);
  const postThumbnails = postData.thumbnails;
  const handleChange: React.Dispatch<React.SetStateAction<any>> = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(
      setPostField({
        [e.currentTarget.name]: e.currentTarget.value,
      }),
    );
  };
  const addImage = (file: string) => {
    dispatch(
      setPostField({
        thumbnails: [...postThumbnails, file],
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
      <UploadableWrapper addFile={addImage}>
        <div className="min-h-fullscreen flex h-full w-full items-stretch justify-center lg:px-64">
          <div className="min-h-min w-full">
            <Gallery addImage={addImage} />
          </div>
          <div className="w-full">
            <div className="h-full bg-green-400 px-10 py-5">
              <TypeToggle />
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
      </UploadableWrapper>
    </form>
  );
};

export default PostEditor;
