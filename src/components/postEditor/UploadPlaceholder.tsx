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
    <label className="font-normal">
      <Uploadable textless />
      <span className="text-center">
        <p>Перетащите изображение в окно</p> <p>или загрузите с помощью</p>
      </span>
      <input
        type="file"
        name="thumbnail"
        className="items-center text-center"
        onChange={(e) => {
          e.currentTarget.files && handleUpload(e.currentTarget.files[0]);
        }}
      />
    </label>
  );
};

export default UploadPlaceholder;
