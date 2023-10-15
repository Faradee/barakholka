import Image from "next/image";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { setDrag } from "@/app/redux/slices/dragSlice";
type GalleryItemProps = {
  image: string;
};
const GalleryItem = (props: GalleryItemProps) => {
  const { image } = props;
  const dispatch = useDispatch();

  return (
    image && (
      <Image
        src={image}
        alt=""
        onDragStart={() => dispatch(setDrag(false))}
        onDragEnd={() => dispatch(setDrag(true))}
        fill
        className="cursor-pointer object-cover"
      />
    )
  );
};

export default memo(GalleryItem);
