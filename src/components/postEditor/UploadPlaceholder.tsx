import Uploadable from "../forms/Uploadable";
type UploadPlaceholderProps = {
  addImage: (file: string) => void;
};
const UploadPlaceholder = (props: UploadPlaceholderProps) => {
  const { addImage } = props;
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => addImage(reader.result as string);
  };
  return (
    <>
      <Uploadable textless />
      <span className="text-center">
        <p>Перетащите картинку в окно</p> <p>или</p>{" "}
      </span>
      <input
        type="file"
        name="thumbnail"
        className="items-center"
        onChange={(e) => {
          e.currentTarget.files && handleUpload(e.currentTarget.files[0]);
        }}
      />
    </>
  );
};

export default UploadPlaceholder;
