import Uploadable from "../forms/Uploadable";
import { useState, memo } from "react";
import GalleryItem from "./GalleryItem";
import { AiOutlineClose } from "react-icons/ai";
import { removeThumbnail } from "@/app/redux/slices/thumbnailSlice";
import { useDispatch } from "react-redux";
type GalleryProps = {
  addImage: (file: string) => void;
  thumbnailList: string[];
};

//TODO: add plus sign to upload image in the top right
const Gallery = (props: GalleryProps) => {
  const { thumbnailList, addImage } = props;
  const first10 = thumbnailList.slice(0, 10);
  const dispatch = useDispatch();
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => addImage(reader.result as string);
  };
  const handleDelete = (index: number) => {
    dispatch(removeThumbnail(index));
  };
  return (
    <div className="flex h-full min-h-min w-full min-w-min flex-col">
      <div
        className="relative flex h-[60%] flex-col items-center justify-center"
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
      <div className="flex h-[40%] flex-row flex-wrap gap-2 p-2">
        {first10.map((image: string, index: number) => (
          <div
            key={index}
            className={`outline-2 ${
              index === selectIndex && "shadow-md"
            } relative h-[calc(50%-0.25rem)] w-[calc(20%-0.4rem)] shadow-red-400 outline-red-400`}
            style={index === selectIndex ? { outlineStyle: "solid" } : {}}
            onClick={() => setSelectIndex(index)}
          >
            <div
              className="onhover absolute right-0 z-10 m-1 cursor-pointer transition-all duration-300 hover:backdrop-blur-sm"
              onClick={() => handleDelete(index)}
            >
              <AiOutlineClose size={20} color="red" />
            </div>
            <GalleryItem image={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Gallery);
