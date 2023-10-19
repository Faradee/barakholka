import { CarState } from "../postEditor/CarForm";
type CarDetailsProps = {
  carDetails: CarState;
};
const CarDetails = (props: CarDetailsProps) => {
  const { carDetails } = props;
  return (
    <>
      <li>
        <span>Год</span>
        <span>{carDetails.year}</span>
      </li>
      <li>
        <span>Марка</span>
        <span>{carDetails.brand}</span>
      </li>
      <li>
        <span>Модель</span>
        <span>{carDetails.model}</span>
      </li>
      <li>
        <span>Пробег</span>
        <span>{carDetails.kilometrage}</span>
      </li>
      <li>
        <span>Цвет</span>
        <span>{carDetails.color}</span>
      </li>
      <li>
        <span>Мощность(л.с.)</span>
        <span>{carDetails.horsepower}</span>
      </li>
      <li>
        <span>Коробка</span>
        <span>{carDetails.transmission}</span>
      </li>

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
