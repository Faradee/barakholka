"use client";
import { useState, useRef, lazy, Suspense } from "react";
import "react-image-crop/dist/ReactCrop.css";
import UploadableWrapper from "@/components/forms/UploadableWrapper";
import { useAppSelector } from "@/redux/store";
import { setAvatar } from "@/actions/userActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { setAvatar as replaceAvatar } from "@/redux/slices/avatarSlice";
const Cropper = lazy(() => import("@/components/forms/Cropper"));
const Avatar = () => {
  const dispatch = useDispatch();
  const uuid = useAppSelector((state) => state.auth.uuid);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<HTMLImageElement>();
  const [avatarURL, setAvatarURL] = useState<string>("");
  const handleUpload = async (fileList: FileList) => {
    if (fileList) {
      setError("");
      const file = fileList[0];
      if (!file.type.match("^image/(png|jpeg|webp|jpg)"))
        setError("Расширение файла не поддерживается");
      else if (file.size > 1024 * 1024)
        setError("Размер изображения не должен превышать 1MB");
      else {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await img.decode();
        if (img.width >= 50 && img.height >= 50) setImage(img);
        else {
          setError("Изображение должно быть минимум размера 50x50");
        }
      }
    }
  };
  const handleAvatarUpload = async () => {
    const res = await setAvatar({ uuid, image: avatarURL });
    if (!res) console.log("set avatar failed");
    else {
      dispatch(replaceAvatar(avatarURL));
      handleCancel();
    }
  };
  const handleCancel = () => {
    setImage(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };
  return (
    <UploadableWrapper handleUpload={handleUpload}>
      <div className="min-h-[400px] w-auto min-w-[100px] p-5 shadow-md">
        {error && <p className="text-red-500">{error}</p>}
        {image && (
          <Suspense fallback={<Skeleton className="h-[200px] w-[200px]" />}>
            <Cropper setImageURL={setAvatarURL} image={image} />
          </Suspense>
        )}
        <p>
          <input
            type="file"
            ref={inputRef}
            className="mb-5"
            onChange={(e) =>
              e.currentTarget.files && handleUpload(e.currentTarget.files)
            }
            accept="image/png,image/jpeg, image/webp, image/jpg"
          />
        </p>

        {image && (
          <p>
            <button
              onClick={handleCancel}
              className="mr-5 rounded-lg bg-slate-100 p-2 hover:bg-slate-200 active:bg-slate-300"
            >
              Отменить
            </button>
            <button
              onClick={handleAvatarUpload}
              className="rounded-lg bg-green-300 p-2 hover:bg-green-400 active:bg-green-500"
            >
              Сохранить
            </button>
          </p>
        )}
      </div>
    </UploadableWrapper>
  );
};

export default Avatar;
