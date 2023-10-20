import Image from "next/image";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { setDrag } from "@/app/redux/slices/dragSlice";
type GalleryItemProps = {
  image: string;
  contain?: boolean;
  pointer?: boolean;
};
const GalleryItem = (props: GalleryItemProps) => {
  const { image, contain, pointer } = props;
  const dispatch = useDispatch();

  return (
    image && (
      <Image
        src={image}
        alt=""
        onDragStart={() => dispatch(setDrag(false))}
        onDragEnd={() => dispatch(setDrag(true))}
        fill
        priority
        className={`w-1/2 ${pointer && "cursor-pointer"} ${
          contain ? "object-contain" : "object-cover"
        }`}
      />
    )
  );
};

export default memo(GalleryItem);
