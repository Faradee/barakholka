import Uploadable from "../forms/Uploadable";
import { useState, memo } from "react";
import GalleryItem from "./GalleryItem";
import GalleryList from "./GalleryList";
type GalleryProps = {
  addImage: (file: string) => void;
  thumbnailList: string[];
};

//TODO: add plus sign to upload image in the top right
const Gallery = (props: GalleryProps) => {
  const { thumbnailList, addImage } = props;
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => addImage(reader.result as string);
  };

  return (
    <div className="flex h-full w-full min-w-min flex-col">
      <div
        className="relative flex h-[50vh] flex-col items-center justify-center"
        onDragStart={(e) => e.preventDefault()}
      >
        {thumbnailList.length === 0 ? (
          <>
            <Uploadable textless />
            <span className="text-center">
              <p>Перетащите картинку в окно</p> <p>или</p>{" "}
            </span>
            <input
              type="file"
              name="thumbnail"
              className="items-center"
              value={thumbnailList[0]}
              onChange={(e) => {
                e.currentTarget.files && handleUpload(e.currentTarget.files[0]);
              }}
            />
          </>
        ) : (
          <div className="relative flex h-full w-3/4 justify-center">
            <GalleryItem image={thumbnailList[selectIndex]} contain />
          </div>
        )}
      </div>
      <GalleryList
        thumbnailList={thumbnailList}
        setSelectIndex={setSelectIndex}
        selectIndex={selectIndex}
        deletable
      />
    </div>
  );
};

export default memo(Gallery);
