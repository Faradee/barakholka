import { AiOutlineClose } from "react-icons/ai";
import GalleryItem from "./GalleryItem";
import { removeThumbnail } from "@/app/redux/slices/thumbnailSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
type GalleryListProps = {
  thumbnailList: string[];
  selectIndex: number;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
  deleteable?: boolean;
};
//TODO add draggable images that change state
const GalleryList = (props: GalleryListProps) => {
  const { thumbnailList, selectIndex, setSelectIndex, deleteable } = props;
  const dispatch = useDispatch();
  const first10 = thumbnailList.slice(0, 10);
  const handleDelete = (index: number) => {
    dispatch(removeThumbnail(index));
    setSelectIndex(index - 1);
  };

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {first10.map((image: string, index: number) => (
        <div
          key={index}
          className={`flex items-center justify-center ${
            (index === selectIndex || (index === 9 && selectIndex >= 9)) &&
            "shadow-lg outline outline-2"
          } relative h-[100px] w-[calc(20%-0.25rem)] shadow-red-400 outline-red-400`}
          onClick={() => setSelectIndex(index)}
        >
          {deleteable && (
            <div
              className="on-parent-hover absolute right-0 top-0 z-10 m-1 cursor-pointer transition-all duration-300 hover:backdrop-blur-sm"
              onClick={() => handleDelete(index)}
            >
              <AiOutlineClose size={20} color="red" />
            </div>
          )}
          {index === 9 && thumbnailList.length > 10 && (
            <div className="pointer-events-none absolute z-20 flex h-full w-full items-center justify-center text-lg text-white before:absolute before:-z-10 before:h-full before:w-full before:bg-black before:opacity-60 ">
              <span className="text-center">
                Еще {thumbnailList.length - index - 1} фото
              </span>
            </div>
          )}
          <GalleryItem image={image} pointer />
        </div>
      ))}
    </div>
  );
};

export default GalleryList;
