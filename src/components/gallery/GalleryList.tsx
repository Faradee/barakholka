import { AiOutlineClose } from "react-icons/ai";
import GalleryItem from "./GalleryItem";
import { removeThumbnail } from "@/redux/slices/thumbnailSlice";
import { useDispatch } from "react-redux";
type GalleryListProps = {
  thumbnailList: string[];
  selectIndex: number;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
  deleteable?: boolean;
};
const GalleryList = (props: GalleryListProps) => {
  const { thumbnailList, selectIndex, setSelectIndex, deleteable } = props;
  const dispatch = useDispatch();
  const first10 = thumbnailList.slice(0, 10);
  const handleDelete = (index: number) => {
    if (index === thumbnailList.length - 1) {
      setSelectIndex(selectIndex - 1);
    }
    dispatch(removeThumbnail(index));
  };

  return (
    <ul className="mb-2 flex flex-row flex-wrap gap-1">
      {first10.map((image: string, index: number) => (
        <li
          key={index}
          className={`flex items-center justify-center ${
            (index === selectIndex || (index === 9 && selectIndex >= 9)) &&
            "shadow-lg outline outline-2"
          } relative h-[100px] w-[calc(20%-0.25rem)] shadow-red-400 outline-red-400`}
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
          <div
            className="relative h-full w-full"
            onClick={() => setSelectIndex(index)}
          >
            <GalleryItem image={image} pointer />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
