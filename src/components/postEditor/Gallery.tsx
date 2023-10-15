import Uploadable from "../forms/Uploadable";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useState, memo } from "react";
import { setDrag } from "@/app/redux/slices/dragSlice";
type GalleryProps = {
  thumbnailList: string[];
};

//TODO: MEMOIZE THUMBNAILS and add plus sign to upload image in the top right
const Gallery = (props: GalleryProps) => {
  // const thumbnailList = useAppSelector((state) => state.postReducer.thumbnails);
  console.log("poop");
  const { thumbnailList } = props;
  const first10 = thumbnailList.slice(0, 10);
  const dispatch = useDispatch();
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => addImage(reader.result as string);
  };
  const handleDrag = (drag: boolean) => {
    dispatch(setDrag(drag));
  };
  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="relative flex h-[60%] flex-col items-center justify-center bg-slate-300"
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
          <Image
            src={thumbnailList[selectIndex]}
            alt="thumbnail"
            className="object-cover"
            fill
          />
        )}
      </div>
      <div className="flex h-[40%] flex-row flex-wrap gap-2 p-2">
        {first10.map((image: string, index: number) => (
          <div
            key={index}
            className={`outline-2 ${
              index === selectIndex && "shadow-md"
            } relative h-[calc(50%-0.25rem)] w-[calc(20%-0.4rem)] shadow-red-400 outline-red-400`}
            onClick={() => setSelectIndex(index)}
            style={index === selectIndex ? { outlineStyle: "solid" } : {}}
          >
            <Image
              src={image}
              alt=""
              onDragStart={() => handleDrag(false)}
              onDragEnd={() => handleDrag(true)}
              fill
              className="cursor-pointer object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Gallery);
