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
    <div className="flex  w-full min-w-min flex-col p-2">
      <div
        className="relative mb-5  h-[70vh] min-h-[400px] w-full"
        onDragStart={(e) => e.preventDefault()}
      >
        {thumbnailList.length === 0 ? (
          children
        ) : (
          <>
            {selectIndex !== 0 && (
              <button
                className="absolute top-1/2 z-10 float-left -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setSelectIndex(selectIndex - 1);
                }}
              >
                <AiOutlineArrowLeft size={50} className="opacity-80" />
              </button>
            )}
            <GalleryItem image={thumbnailList[selectIndex]} blurred />
            <GalleryItem image={thumbnailList[selectIndex]} contain />

            {selectIndex !== thumbnailList.length - 1 && (
              <button
                className="absolute right-0 top-1/2 z-10 float-right -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setSelectIndex(selectIndex + 1);
                }}
              >
                <AiOutlineArrowRight className="opacity-80" size={50} />
              </button>
            )}
          </>
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
