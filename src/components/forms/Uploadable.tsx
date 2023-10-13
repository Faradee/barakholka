import { AiOutlineCloudUpload } from "react-icons/ai";
const Uploadable = () => {
  return (
    <div className="pointer-events-none absolute flex translate-y-[-25%] flex-col items-center justify-center">
      <AiOutlineCloudUpload size={"xl"} />
      Отпустите чтобы загрузить файл
    </div>
  );
};

export default Uploadable;
