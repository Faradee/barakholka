import { useDispatch } from "react-redux";
import FormField from "../forms/FormField";
import { useEffect } from "react";
import { useAppSelector } from "@/app/redux/store";
import { setPostField } from "@/app/redux/slices/postSlice";
export type CarState = {
  kilometrage: string;
  year: string;
  horsepower: string;
  transmission: string;
  brand: string;
  model: string;
  color: string;
  damaged: boolean;
};
type CarFormProps = {
  handleChange: React.Dispatch<any>;
};
const CarForm = (props: CarFormProps) => {
  const postData = useAppSelector((state) => state.postReducer);

  const { handleChange } = props;
  const details = postData.details as CarState;
  return (
    <>
      <div className="flex w-full gap-x-0.5">
        <FormField
          type="number"
          useState={[details.kilometrage, handleChange]}
          placeholder="Километраж"
          name="kilometrage"
          onChange={handleChange}
        />
        <FormField
          type="number"
          name="year"
          placeholder="Год выпуска"
          useState={[details.year, handleChange]}
          onChange={handleChange}
        />
      </div>

      <FormField
        type="number"
        name="horsepower"
        placeholder="Мощность двигателя(л.с.)"
        useState={[details.horsepower, handleChange]}
        onChange={handleChange}
      />
      <div className="flex w-full gap-x-0.5">
        <FormField
          type="text"
          name="brand"
          placeholder="Название бренда"
          useState={[details.brand, handleChange]}
          onChange={handleChange}
          noMargin
        />
        <FormField
          type="text"
          name="model"
          placeholder="Модель"
          useState={[details.model, handleChange]}
          onChange={handleChange}
          noMargin
        />
      </div>
      <FormField
        type="text"
        name="color"
        placeholder="Цвет"
        useState={[details.color, handleChange]}
        onChange={handleChange}
      />
      <FormField
        type="text"
        name="transmission"
        placeholder="Вид коробки передач"
        useState={[details.transmission, handleChange]}
        onChange={handleChange}
      />
    </>
  );
};

export default CarForm;
