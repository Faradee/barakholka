"use client";
import { useState, memo } from "react";
import GalleryItem from "./GalleryItem";
import GalleryList from "./GalleryList";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Image from "next/image";
import AddGallery from "./AddGallery";
import UploadPlaceholder from "../postEditor/UploadPlaceholder";
import thumbnailPlaceholder from "/public/thumbnailPlaceholder.webp";
type GalleryProps = {
  thumbnailList: string[];
  deleteable?: boolean;
  handleUpload?: (fileList: FileList) => void;
  uploadable?: boolean;
};

const Gallery = (props: GalleryProps) => {
  const { thumbnailList, handleUpload, uploadable, deleteable = false } = props;
  const [selectIndex, setSelectIndex] = useState<number>(0);
  return (
    <div className="flex h-full w-full flex-col p-2 lg:min-h-[80vh]">
      <div
        className="relative mb-5 flex h-full w-full flex-col items-center justify-center"
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="relative flex w-full justify-center">
          {thumbnailList.length === 0 ? (
            uploadable && handleUpload ? (
              <UploadPlaceholder handleUpload={handleUpload} />
            ) : (
              <Image
                src={thumbnailPlaceholder}
                width={500}
                height={500}
                alt="thumbnail placeholder"
              />
            )
          ) : (
            <div className="relative min-h-[500px] w-full select-none">
              {selectIndex > 0 && (
                <button
                  title="Предыдущее фото"
                  className="absolute left-0 top-1/2 z-10 ml-1 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    setSelectIndex(selectIndex - 1);
                  }}
                >
                  <BsFillArrowLeftCircleFill
                    size={50}
                    color="white"
                    className="opacity-80 drop-shadow-md"
                  />
                </button>
              )}
              <GalleryItem image={thumbnailList[selectIndex]} blurred />
              <GalleryItem image={thumbnailList[selectIndex]} contain />
              {selectIndex < thumbnailList.length - 1 && (
                <button
                  title="Следующее фото"
                  className="absolute right-0 top-1/2 z-10 mr-1 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    setSelectIndex(selectIndex + 1);
                  }}
                >
                  <BsFillArrowRightCircleFill
                    color="white"
                    className="opacity-80 drop-shadow-md"
                    size={50}
                  />
                </button>
              )}
              {handleUpload && (
                <div className="on-parent-hover">
                  <AddGallery handleUpload={handleUpload} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <GalleryList
        thumbnailList={thumbnailList}
        setSelectIndex={setSelectIndex}
        selectIndex={selectIndex}
        deleteable={deleteable}
      />
    </div>
  );
};

export default memo(Gallery);
