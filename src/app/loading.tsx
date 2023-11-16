import Loader from "@/components/loader/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-[calc(100vh-5.5rem)] w-full justify-center overflow-y-hidden">
      <Loader />
    </div>
  );
};

export default Loading;
