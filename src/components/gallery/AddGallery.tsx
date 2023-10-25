import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
type AddGalleryProps = {
  handleUpload: (fileList: FileList) => void;
};
const AddGallery = ({ handleUpload }: AddGalleryProps) => {
  return (
    <label className="visible absolute right-0 m-4 h-[1/5] w-[1/5] cursor-pointer bg-white bg-opacity-20 text-4xl opacity-80 shadow-sm backdrop-blur-md">
      <input
        type="file"
        className="hidden"
        onChange={(e) =>
          e.currentTarget.files && handleUpload(e.currentTarget.files)
        }
        multiple
      />
      <AiOutlinePlus color="white" size={64} />
    </label>
  );
};

export default AddGallery;
