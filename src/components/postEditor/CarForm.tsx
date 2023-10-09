import { useDispatch } from "react-redux";
import FormField from "../forms/FormField";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/app/redux/store";
import { setPostField } from "@/app/redux/slices/postSlice";
import LabelFormField from "../forms/LabelFormField";
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
  const dispatch = useDispatch();
  const postData = useAppSelector((state) => state.postReducer);

  const { handleChange } = props;
  const details = postData.details as CarState;
  useEffect(() => {
    const initialCarData = {
      kilometrage: "0",
      year: "0",
      transmission: "",
      brand: "",
      model: "",
      color: "",
      damaged: false,
    } as CarState;
    dispatch(setPostField({ details: initialCarData }));
  }, [dispatch]);
  return (
    <>
      <div className="flex gap-x-0.5">
        <LabelFormField
          type="number"
          label="Километраж"
          useState={[details.kilometrage, handleChange]}
          placeholder="Километраж"
          name="kilometrage"
          onChange={handleChange}
        />
        <LabelFormField
          type="number"
          name="year"
          label="Год Выпуска"
          placeholder="Год выпуска"
          useState={[details.year, handleChange]}
          onChange={handleChange}
        />
      </div>

      <LabelFormField
        type="number"
        name="horsepower"
        label="Мощность двигателя(л.с.)"
        placeholder="Мощность двигателя(л.с.)"
        useState={[details.horsepower, handleChange]}
        onChange={handleChange}
      />
      <div className="flex gap-x-0.5">
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
