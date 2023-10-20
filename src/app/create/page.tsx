"use client";
import { useEffect, useCallback, useState } from "react";
import TypeToggle from "@/components/postEditor/TypeToggle";
import FormField from "@/components/forms/FormField";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { setPostField, resetPostData } from "@/app/redux/slices/postSlice";
import DetailsForm from "@/components/postEditor/DetailsForm";
import Gallery from "@/components/gallery/Gallery";
import UploadableWrapper from "@/components/forms/UploadableWrapper";
import { addThumbnail, resetThumbnails } from "../redux/slices/thumbnailSlice";
import Button from "@/components/forms/Button";
import { createPost } from "@/serverActions";
import { useRouter } from "next/navigation";
import { setError } from "../redux/slices/errorSlice";
import UploadPlaceholder from "@/components/postEditor/UploadPlaceholder";
import { loadResource } from "@/components/Loading";
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
  const error = useAppSelector((state) => state.errorReducer.error);
  const [filesSize, setFilesSize] = useState<number>(0);
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
      const size = new Blob([file]).size;
      if (filesSize + size < 1024 * 1024 * 5) dispatch(addThumbnail(file));
      else dispatch(setError("SizeOverflow"));
    },
    [dispatch, filesSize],
  );

  const handleSubmit = async () => {
    console.log("Creating post...");
    if (postData.title && postData.price)
      await createPost({ thumbnails: postThumbnails, ...postData });
    console.log("Post created!");
    router.replace("/");
    dispatch(resetPostData());
    dispatch(resetThumbnails());
  };

  useEffect(() => {
    dispatch(setPostField({ posterId: uuid }));
    return () => {
      dispatch(resetPostData());
      dispatch(resetThumbnails());
    };
  }, [dispatch, uuid]);
  useEffect(() => {
    let size: number = 0;
    postThumbnails.forEach((thumbnail) => {
      size += new Blob([thumbnail]).size;
    });
    if (size < 1024 * 1024 * 5) dispatch(setError(null));
    setFilesSize(size);
  }, [postThumbnails, dispatch]);
  useEffect(() => {
    if (!uuid) router.replace("/");
  }, [uuid, router]);
  return (
    <UploadableWrapper addFile={addImage}>
      {error === "SizeOverflow" && (
        <div className="flex w-full justify-center text-red-600">
          <span>Суммарный размер файлов не должен превышать 5MB!</span>
        </div>
      )}
      <div
        className="min-h-fullscreen flex h-full w-full flex-wrap items-stretch justify-center lg:flex-nowrap "
        onDrop={(e) => e.preventDefault()}
      >
        <div className="w-full">
          <Gallery thumbnailList={postThumbnails} deleteable>
            <UploadPlaceholder addImage={addImage} />
          </Gallery>
        </div>
        <div className="w-full lg:w-auto">
          <div className="h-full px-10 py-5">
            <TypeToggle />
            <div className="flex w-full flex-col items-center">
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
            <Button
              onClick={() => loadResource(handleSubmit())}
              title="Создать объявление"
            />
          </div>
        </div>
      </div>
    </UploadableWrapper>
  );
};

export default PostEditor;
