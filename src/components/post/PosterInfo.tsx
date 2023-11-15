import Image from "next/image";
import defaultUserImage from "/public/Default_pfp.png";
const PosterInfo = ({
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
  return (
    <>
      <div className="break-words pr-5">
        <Image
          src={
            posterData.avatar?.image
              ? posterData.avatar.image
              : defaultUserImage
          }
          width={48}
          height={48}
          className="rounded-full"
          alt="thumbnail"
        />
      </div>
      <div className="font-bold">
        <p className="max-w-[12rem] overflow-hidden text-ellipsis">
          {posterData.name}
        </p>
        <p className="max-w-[12rem] overflow-hidden text-ellipsis">
          {posterData.city ? "г. " + posterData.city : posterData.email}
        </p>
      </div>
    </>
  );
};

export default PosterInfo;
