"use client";
import { useEffect, useCallback, useState } from "react";
import TypeToggle from "@/components/postEditor/TypeToggle";
import FormField from "@/components/forms/FormField";
import { CarState } from "@/components/postEditor/CarForm";
import { EstateState } from "@/components/postEditor/EstateForm";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setPostField, resetPostData } from "@/redux/slices/postSlice";
import DetailsForm from "@/components/postEditor/DetailsForm";
import Gallery from "@/components/gallery/Gallery";
import UploadableWrapper from "@/components/forms/UploadableWrapper";
import {
  addThumbnail,
  resetThumbnails,
} from "../../redux/slices/thumbnailSlice";
import Button from "@/components/forms/Button";
import { createPost } from "@/actions/postActions";
import { useRouter } from "next/navigation";
import { setError } from "../../redux/slices/errorSlice";
import { loadResource } from "@/components/Loading";
import ErrorHeader from "@/components/ErrorHeader";
import { postSchema } from "@/actions/postSchemas";
//TODO: ADD LOADING ANIMATION AND STATE
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
  const { uuid } = useAppSelector((state) => state.auth);
  const postData = useAppSelector((state) => state.post);
  const error = useAppSelector((state) => state.error.error);
  const [filesSize, setFilesSize] = useState<number>(0);
  const postThumbnails = useAppSelector((state) => state.thumbnail.thumbnails);
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
  const handleUpload = useCallback(
    (fileList: FileList) => {
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          const reader = new FileReader();
          const file = fileList[i];
          if (file.type.match("^image/(png|jpeg|webp|jpg)")) {
            const image = file as Blob;
            if (filesSize + image.size < 1024 * 1024 * 5) {
              setFilesSize(filesSize + image.size);
              reader.readAsDataURL(image);
              reader.onload = () => {
                const file = reader.result as string;
                dispatch(addThumbnail(file));
              };
            } else dispatch(setError("SizeError"));
          } else {
            dispatch(setError("TypeError"));
            break;
          }
        }
      }
    },
    [dispatch, filesSize],
  );
  const handleSubmit = async () => {
    const data = { thumbnails: postThumbnails, ...postData };
    const validate = postSchema.safeParse(data);
    if (validate.success) {
      await createPost(data);
      router.replace("/");
    }
  };

  useEffect(() => {
    dispatch(setPostField({ posterId: uuid }));
    return () => {
      dispatch(resetPostData());
      dispatch(resetThumbnails());
    };
  }, [dispatch, uuid]);

  useEffect(() => {
    let tempSize: number = 0;
    postThumbnails.forEach((thumbnail) => {
      tempSize += new Blob([thumbnail]).size;
    });
    if (tempSize < 1024 * 1024 * 5) dispatch(setError(null));
    setFilesSize(tempSize);
  }, [postThumbnails, dispatch]);

  useEffect(() => {
    if (!uuid) router.replace("/");
  }, [uuid, router]);
  return (
    <>
      {error && <ErrorHeader />}
      <div
        className="relative flex h-full w-full flex-wrap  justify-center lg:flex-nowrap "
        onDrop={(e) => e.preventDefault()}
      >
        <div className="relative w-full">
          <UploadableWrapper handleUpload={handleUpload}>
            <Gallery
              thumbnailList={postThumbnails}
              handleUpload={handleUpload}
              deleteable
              uploadable
            />
          </UploadableWrapper>
        </div>

        <div className="w-full lg:w-auto">
          <div className="h-full px-10">
            <TypeToggle />
            <div className="flex w-full flex-col items-center">
              <FormField
                type="text"
                placeholder="Заголовок объявления"
                name="title"
                useState={[postData.title, handleChange]}
                onChange={handleChange}
                required
              />
              <FormField
                type="number"
                placeholder="Цена"
                name="price"
                useState={[postData.price, handleChange]}
                onChange={handleChange}
                required
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
    </>
  );
};

export default PostEditor;
