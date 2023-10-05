"use client";
import { useState } from "react";
import TypeToggle from "./TypeToggle";

const PostEditor = () => {
  const [typeIndex, setTypeIndex] = useState<number>(0);
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <div className="h-[55vh] w-[30vw] bg-slate-300">thumbnail</div>
        <div className="flex h-[25vh] w-[30vw] flex-row bg-red-400">
          thumbnails
        </div>
      </div>
      <form>
        <div className="h-[80vh] w-[25vw] justify-center bg-green-400">
          <TypeToggle typeIndex={typeIndex} setTypeIndex={setTypeIndex} />
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
