"use client";
import { useState } from "react";
import TypeToggle from "./TypeToggle";
import FormField from "../forms/FormField";

const PostEditor = () => {
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const getTypeFromIndex = (typeIndex: number) => {
    switch (typeIndex) {
      case 0:
        return "car";
      case 1:
        return "estate";
      case 2:
        return "misc";
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <div className="h-[55vh] w-[30vw] bg-slate-300">thumbnail</div>
        <div className="flex h-[25vh] w-[30vw] flex-row bg-red-400">
          thumbnails
        </div>
      </div>
      <form>
        <div className="h-[80vh] w-[25vw] bg-green-400">
          <TypeToggle typeIndex={typeIndex} setTypeIndex={setTypeIndex} />
          <div className="flex flex-col items-center justify-center">
            <FormField
              type="text"
              placeholder="Заголовок объявления"
              useState={[title, setTitle]}
            />
            <FormField
              type="text"
              placeholder="Цена"
              useState={[price, setPrice]}
            />
            <textarea
              className="w-50 h-50"
              id="description"
              placeholder="Добавьте описание"
              name="description"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
