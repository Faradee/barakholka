import { useDispatch } from "react-redux";
import FormField from "../forms/FormField";
import LabelFormField from "../forms/LabelFormField";
import { useAppSelector } from "@/app/redux/store";
import { setDetailsField } from "@/app/redux/slices/postSlice";
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
  const toggleBoolean = (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(
      setDetailsField({
        [e.currentTarget.name]: e.currentTarget.checked,
      }),
    );
  };
  const { handleChange } = props;
  const details = postData.details as CarState;
  return (
    <>
      <section className="flex w-full items-center gap-x-0.5">
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
      </section>
      <FormField
        type="number"
        name="horsepower"
        placeholder="Мощность двигателя(л.с.)"
        useState={[details.horsepower, handleChange]}
        onChange={handleChange}
      />

      <section className="flex w-full items-center gap-x-0.5">
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
      </section>
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
      <LabelFormField
        type="boolean"
        name="damaged"
        label="Повреждения"
        useState={[details.damaged, toggleBoolean]}
      />
    </>
  );
};

export default CarForm;
