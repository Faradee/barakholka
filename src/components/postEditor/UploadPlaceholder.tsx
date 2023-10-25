import Uploadable from "../forms/Uploadable";
type UploadPlaceholderProps = {
  handleUpload: (fileList: FileList) => void;
};
const UploadPlaceholder = (props: UploadPlaceholderProps) => {
  const { handleUpload } = props;

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
          e.currentTarget.files && handleUpload(e.currentTarget.files);
        }}
        multiple
      />
    </label>
  );
};

export default UploadPlaceholder;
