import { AiOutlineCloudUpload } from "react-icons/ai";
type UploadableProps = {
  textless?: boolean;
};
const Uploadable = (props: UploadableProps) => {
  return (
    <div className="pointer-events-none  flex  translate-y-[-5%]  flex-col items-center justify-center">
      <AiOutlineCloudUpload size={"300"} className="pointer-events-none" />
      {!props.textless && (
        <span className="pointer-events-none">
          Отпустите чтобы загрузить файл
        </span>
      )}
    </div>
  );
};

export default Uploadable;
