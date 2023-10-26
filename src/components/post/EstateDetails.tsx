import { EstateState } from "../postEditor/EstateForm";
type EstateDetailsProps = {
  estateDetails: EstateState;
};
const EstateDetails = (props: EstateDetailsProps) => {
  const { estateDetails } = props;
  return (
    <>
      {estateDetails.space && (
        <li>
          <span>Площадь</span>
          <span>{estateDetails.space}</span>
        </li>
      )}

      {estateDetails.rooms && (
        <li>
          <span>Число комнат</span>
          <span>{estateDetails.rooms}</span>
        </li>
      )}
      {estateDetails.floor && (
        <li>
          <span>Этаж</span>
          <span>{estateDetails.floor}</span>
        </li>
      )}
      {
        <li>
          <span>Ремонт</span>
          <span>{estateDetails.renovation ? "Есть" : "Нету"}</span>
        </li>
      }
      {
        <li>
          <span>Мебель</span>
          <span>
            {estateDetails.furniture ? "Присутствует" : "Отсутствует"}
          </span>
        </li>
      }
    </>
  );
};

export default EstateDetails;
