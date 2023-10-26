import { CarState } from "../postEditor/CarForm";
type CarDetailsProps = {
  carDetails: CarState;
};
const CarDetails = (props: CarDetailsProps) => {
  const { carDetails } = props;
  return (
    <>
      {carDetails.year && (
        <li>
          <span>Год</span>
          <span>{carDetails.year} г.</span>
        </li>
      )}
      {carDetails.brand && (
        <li>
          <span>Марка</span>
          <span>{carDetails.brand}</span>
        </li>
      )}
      {carDetails.model && (
        <li>
          <span>Модель</span>
          <span>{carDetails.model}</span>
        </li>
      )}
      {carDetails.kilometrage && (
        <li>
          <span>Пробег</span>
          <span>{carDetails.kilometrage} км</span>
        </li>
      )}
      {carDetails.color && (
        <li>
          <span>Цвет</span>
          <span>{carDetails.color}</span>
        </li>
      )}
      {carDetails.horsepower && (
        <li>
          <span>Мощность(л.с.)</span>
          <span>{carDetails.horsepower} л.с.</span>
        </li>
      )}
      {carDetails.transmission && (
        <li>
          <span>Коробка</span>
          <span>{carDetails.transmission}</span>
        </li>
      )}

      <li>
        <span>Состояние</span>
        <span>
          {carDetails.damaged ? "Есть повреждения" : "Поврежднений нет"}
        </span>
      </li>
      <li>
        <span>Обмен</span>
        <span>
          {" "}
          {carDetails.trade ? "Рассматриваются варианты" : "Не рассматривается"}
        </span>
      </li>
    </>
  );
};

export default CarDetails;
