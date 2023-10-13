import { useAppSelector } from "@/app/redux/store";
import Uploadable from "../forms/Uploadable";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setPostField } from "@/app/redux/slices/postSlice";
type GalleryProps = {
  addImage: (file: string) => void;
};
const Gallery = (props: GalleryProps) => {
  const thumbnailList = useAppSelector((state) => state.postReducer.thumbnails);
  const dispatch = useDispatch();
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
  return (
    <div className="flex h-full w-full flex-col">
      <div className=" flex h-[70%] flex-col items-center justify-center bg-slate-300">
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
            src={thumbnailList[0]}
            alt="thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full"
          />
        )}
      </div>
      <div className="flex h-[30%] flex-row bg-red-400">thumbnails</div>
    </div>
  );
};

export default Gallery;
