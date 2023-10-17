"use client";
import { useEffect, useCallback } from "react";
import TypeToggle from "@/components/postEditor/TypeToggle";
import FormField from "@/components/forms/FormField";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { setPostField, resetPostData } from "@/app/redux/slices/postSlice";
import DetailsForm from "@/components/postEditor/DetailsForm";
import Gallery from "@/components/postEditor/Gallery";
import UploadableWrapper from "@/components/forms/UploadableWrapper";
import { addThumbnail } from "../redux/slices/thumbnailSlice";
import Button from "@/components/forms/Button";
import { createPost } from "@/serverActions";
import { useRouter } from "next/navigation";
export type PostState = {
  posterId: string;
  title: string;
  type: "car" | "estate" | "misc";
  description: string;
  price: string;
  details?: CarState | EstateState;
};
export type PostData = PostState & {
  thumbnails: string[];
};

const PostEditor = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { uuid } = useAppSelector((state) => state.authReducer);
  const postData = useAppSelector((state) => state.postReducer);
  const postThumbnails = useAppSelector(
    (state) => state.thumbnailReducer.thumbnails,
  );
  const handleChange: React.Dispatch<React.SetStateAction<any>> = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(
        setPostField({
          [e.currentTarget.name]: e.currentTarget.value,
        }),
      );
    },
    [dispatch],
  );
  const addImage = useCallback(
    (file: string) => {
      dispatch(addThumbnail(file));
    },
    [dispatch],
  );

  const handleSubmit = () => {
    console.log("Creating post...");
    if (postData.title && postData.price)
      createPost({ thumbnails: postThumbnails, ...postData });
    console.log("Post created!");
    dispatch(resetPostData());
    router.replace("/");
  };
  useEffect(() => {
    dispatch(setPostField({ posterId: uuid }));
    return () => {
      dispatch(resetPostData());
    };
  }, [dispatch, uuid]);
  return (
    <UploadableWrapper addFile={addImage}>
      <div
        className="min-h-fullscreen flex h-full w-full flex-wrap items-stretch justify-center lg:flex-nowrap lg:px-[10vw]"
        onDrop={(e) => e.preventDefault()}
      >
        <div className=" min-h-[70vh] w-full">
          <Gallery addImage={addImage} thumbnailList={postThumbnails} />
        </div>
        <div className="w-full lg:w-auto">
          <div className="h-full px-10 py-5">
            <TypeToggle />
            <div className="flex min-h-[70vh] w-full flex-col items-center">
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
                rows={6}
              />
            </div>
            <Button onClick={handleSubmit} title="Создать объявление" />
          </div>
        </div>
      </div>
    </UploadableWrapper>
  );
};

export default PostEditor;
