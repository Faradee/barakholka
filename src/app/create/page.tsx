import React from "react";
const CreatePage = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <div className="h-[55vh] w-[30vw] bg-slate-300">thumbnail</div>
        <div className="flex h-[25vh] w-[30vw] flex-row bg-red-400">
          thumbnails
        </div>
      </div>
      <div className="flex h-[80vh] w-[25vw] items-center justify-center bg-green-400">
        inputs
      </div>
    </div>
  );
};

export default CreatePage;
