import { AiOutlineClose } from "react-icons/ai";
import GalleryItem from "./GalleryItem";
import { removeThumbnail } from "@/app/redux/slices/thumbnailSlice";
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
    dispatch(removeThumbnail(index));
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {first10.map((image: string, index: number) => (
        <div
          key={index}
          className={`outline-2 ${
            index === selectIndex && "shadow-md"
          } relative h-[150px] w-[calc(20%-0.4rem)] shadow-red-400 outline-red-400`}
          style={index === selectIndex ? { outlineStyle: "solid" } : {}}
          onClick={() => setSelectIndex(index)}
        >
          {deleteable && (
            <div
              className="onhover absolute right-0 z-10 m-1 cursor-pointer transition-all duration-300 hover:backdrop-blur-sm"
              onClick={() => handleDelete(index)}
            >
              <AiOutlineClose size={20} color="red" />
            </div>
          )}

          <GalleryItem image={image} pointer />
        </div>
      ))}
    </div>
  );
};

export default GalleryList;
