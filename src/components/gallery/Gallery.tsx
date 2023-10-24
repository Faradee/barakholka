"use client";
import { useState, memo } from "react";
import GalleryItem from "./GalleryItem";
import GalleryList from "./GalleryList";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
type GalleryProps = {
  thumbnailList: string[];
  children?: React.ReactNode;
  deleteable?: boolean;
};

//TODO: add plus sign to upload image in the top right
const Gallery = (props: GalleryProps) => {
  const { thumbnailList, children, deleteable = false } = props;
  const [selectIndex, setSelectIndex] = useState<number>(0);
  return (
    <div className="flex w-full flex-col p-2">
      <div
        className="relative mb-5 flex h-full flex-col items-center justify-center"
        onDragStart={(e) => e.preventDefault()}
      >
        {thumbnailList.length === 0 ? (
          children
        ) : (
          <div className="relative min-h-[400px] w-full lg:max-w-[50vw]">
            {selectIndex !== 0 && (
              <button
                name="arrowLeft"
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setSelectIndex(selectIndex - 1);
                }}
              >
                <AiOutlineArrowLeft
                  size={50}
                  color="white"
                  className="opacity-80 drop-shadow-md"
                />
              </button>
            )}
            <GalleryItem image={thumbnailList[selectIndex]} blurred />
            <GalleryItem image={thumbnailList[selectIndex]} contain />
            {selectIndex !== thumbnailList.length - 1 && (
              <button
                name="arrowRight"
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setSelectIndex(selectIndex + 1);
                }}
              >
                <AiOutlineArrowRight
                  color="white"
                  className="opacity-80 drop-shadow-md"
                  size={50}
                />
              </button>
            )}
          </div>
        )}
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
