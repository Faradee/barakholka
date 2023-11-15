"use client";
import { useState, useRef } from "react";

import PosterCard from "./PosterCard";
import DropDownContainer, {
  useClickOutside,
} from "../containers/DropDownContainer";
import PosterInfo from "./PosterInfo";
const PosterContainer = ({
  posterData,
}: {
  posterData: {
    name: string;
    avatar: { image: string } | null;
    createdAt: Date;
    email: string;
    phone?: string;
    city?: string;
  };
}) => {
  const [isCard, setIsCard] = useState<boolean>(false);
  const activationRef = useRef(null);
  useClickOutside(activationRef, () => setIsCard(false));
  if (posterData)
    return (
      <div
        ref={activationRef}
        tabIndex={0}
        className="relative mb-0.5 mr-10 h-full w-full cursor-pointer rounded-lg border border-black p-1  active:mb-0 active:mt-0.5 "
      >
        <div className="flex w-full" onClick={() => setIsCard(!isCard)}>
          <PosterInfo posterData={posterData} />
        </div>
        <DropDownContainer active={isCard}>
          <PosterCard posterData={posterData} />
        </DropDownContainer>
      </div>
    );
  else return <div>Пользователь не найден</div>;
};

export default PosterContainer;
