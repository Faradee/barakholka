import { useAppSelector } from "@/app/redux/store";
import Uploadable from "../forms/Uploadable";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useState } from "react";
import { setDrag } from "@/app/redux/slices/dragSlice";
type GalleryProps = {
  addImage: (file: string) => void;
};
const Gallery = (props: GalleryProps) => {
  const thumbnailList = useAppSelector((state) => state.postReducer.thumbnails);
  const first10 = thumbnailList.slice(0, 10);
  const dispatch = useDispatch();
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      dispatch(
        setPostField({
          thumbnails: [...thumbnailList, reader.result as string],
        }),
      );
    };
  };
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("outline-2");
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
      <div className="flex h-[40%] flex-row flex-wrap gap-2  bg-red-400 p-2">
        {first10.map((image: string, index: number) => (
          <div
            key={index}
            className="outline-3 relative h-[calc(50%-0.25rem)] w-[calc(20%-0.4rem)] outline-green-300"
            onClick={() => setSelectIndex(index)}
            style={index === selectIndex ? { outlineStyle: "solid" } : {}}
          >
            <Image
              src={image}
              alt=""
              onDragStart={() => handleDrag(false)}
              onDragEnd={() => handleDrag(true)}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
