"use client";
import Uploadable from "../forms/Uploadable";
import { useState, memo } from "react";
import GalleryItem from "./GalleryItem";
import GalleryList from "./GalleryList";
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
    <div className="flex h-[70vh] min-h-[300px] w-full min-w-min flex-col p-2">
      <div
        className="relative mb-5 flex h-2/3 w-full flex-col items-center justify-center"
        onDragStart={(e) => e.preventDefault()}
      >
        {thumbnailList.length === 0 ? (
          children
        ) : (
          <GalleryItem image={thumbnailList[selectIndex]} contain />
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
