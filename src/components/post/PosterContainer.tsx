"use client";
import { useState } from "react";

import PosterCard from "./PosterCard";
import DropDownContainer, { handleBlur } from "../containers/DropDownContainer";
import PosterInfo from "./PosterInfo";
const PosterContainer = ({
  posterData,
}: {
  posterData: {
    name: string;
    avatar: { image: string } | null;
    createdAt: Date;
    email: string;
  };
}) => {
  const [isCard, setIsCard] = useState<boolean>(false);
  if (posterData)
    return (
      <div className="mb-0.5 mr-10 w-full active:mb-0 active:pt-0.5">
        <div
          onBlur={(e) => handleBlur(setIsCard)(e)}
          tabIndex={0}
          className="relative   h-full  cursor-pointer rounded-lg border border-black"
        >
          <div className="flex p-1" onClick={() => setIsCard(!isCard)}>
            <PosterInfo posterData={posterData} />
          </div>

          {isCard && (
            <DropDownContainer>
              <PosterCard posterData={posterData} />
            </DropDownContainer>
          )}
        </div>
      </div>
    );
  else return <div>Пользователь не найден</div>;
};

export default PosterContainer;
