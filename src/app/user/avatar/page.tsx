"use client";
import { useState, useRef } from "react";
import NextImage from "next/image";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import UploadableWrapper from "@/components/forms/UploadableWrapper";
import { setAvatar } from "@/actions/userActions";
import { useAppSelector } from "@/redux/store";
import logo from "/public/rea-logo.webp";
const Avatar = () => {
  const uuid = useAppSelector((state) => state.auth.uuid);
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [blob, setBlob] = useState<string>("");
  const [image, setImage] = useState<HTMLImageElement>();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const handleUpload = async (fileList: FileList) => {
    if (fileList) {
      setBlob("");
      setError("");
      const file = fileList[0];
      if (!file.type.match("^image/(png|jpeg|webp|jpg)"))
        setError("Расширение файла не поддерживается");
      if (file.size > 1024 * 1024)
        setError("Размер изображения не должен превышать 1MB");
      else {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await img.decode();
        const crop = centerCrop(
          makeAspectCrop(
            {
              unit: "%",
              width: 100,
            },
            1,
            img.width,
            img.height,
          ),
          img.width,
          img.height,
        );
        setCrop(crop);
        setImage(img);
      }
    }
  };
  const handleCancel = () => {
    setImage(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleCrop = async () => {
    const imgContainer = imgRef.current;
    console.log(completedCrop);
    if (!image || !completedCrop || !imgContainer) {
      throw new Error("Вырезанная картинка не существует");
    }
    const ratio = [
      image.width / imgContainer.width,
      image.height / imgContainer.height,
    ];
    const offscreen = new OffscreenCanvas(
      completedCrop.width * ratio[0],
      completedCrop.height * ratio[1],
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) throw new Error("Нету 2d контекста");

    ctx.drawImage(
      image,
      completedCrop.x * ratio[0],
      completedCrop.y * ratio[1],
      completedCrop.width * ratio[0],
      completedCrop.height * ratio[1],
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    const blob = await offscreen.convertToBlob({
      type: "image/webp",
    });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = async () => {
      const image = reader.result as string;
      setBlob(image);
      const res = await setAvatar({ uuid, image });
      if (!res) console.log("set avatar failed");
      else handleCancel();
    };
  };
  return (
    <UploadableWrapper handleUpload={handleUpload}>
      <div className="min-h-[400px] w-auto min-w-[100px] p-5 shadow-md">
        {error && <p className="text-red-500">{error}</p>}
        {image && (
          <>
            <ReactCrop
              crop={crop}
              aspect={1}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => {
                setCompletedCrop(c);
              }}
              minHeight={50}
              minWidth={50}
            >
              <NextImage
                src={image.src}
                ref={imgRef}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  maxHeight: 600,
                  maxWidth: 800,
                  objectFit: "contain",
                  height: "auto",
                  width: "auto",
                }}
                alt="avatar"
              />
            </ReactCrop>
            {/* {completedCrop && (
              <NextImage
                src={blob ? blob : logo}
                alt="poop"
                width={completedCrop.width}
                height={completedCrop.height}
              />
            )} */}
          </>
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
              onClick={handleCrop}
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
