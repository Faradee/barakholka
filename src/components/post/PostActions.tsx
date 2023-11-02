import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
//TODO: ADD CONFIRMATION FOR DELETING
const PostActions = () => {
  return (
    <button
      title=""
      className="mb-1 flex items-center border-2 border-l-0 border-gray-300 bg-gray-100 p-0.5 active:bg-gray-200"
    >
      <AiOutlineCaretDown />
    </button>
  );
};

export default PostActions;
