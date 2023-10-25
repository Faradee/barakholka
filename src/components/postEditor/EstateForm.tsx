import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import FormField from "../forms/FormField";
import LabelFormField from "../forms/LabelFormField";
import { setDetailsField } from "@/redux/slices/postSlice";
export type EstateState = {
  space: string;
  rooms: string;
  floor: string;
  furniture: boolean;
  renovation: boolean;
};
type EstateFormProps = {
  handleChange: React.Dispatch<any>;
};

const EstateForm = (props: EstateFormProps) => {
  const dispatch = useDispatch();
  const postData = useAppSelector((state) => state.post);
  const { handleChange } = props;
  const toggleBoolean = (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(
      setDetailsField({
        [e.currentTarget.name]: e.currentTarget.checked,
      }),
    );
  };
  const details = postData.details as EstateState;
  return (
    <>
      <div className="flex w-full gap-x-0.5">
        <FormField
          type="number"
          useState={[details.space, handleChange]}
          placeholder="Площадь в м^2"
          name="space"
          onChange={handleChange}
        />
        <FormField
          type="number"
          name="rooms"
          placeholder="Количество комнат"
          useState={[details.rooms, handleChange]}
          onChange={handleChange}
        />
      </div>
      <FormField
        type="number"
        name="floor"
        placeholder="Число этажей"
        useState={[details.floor, handleChange]}
        onChange={handleChange}
      />
      <div className="flex w-full justify-start">
        <LabelFormField
          type="boolean"
          name="furniture"
          label="Наличие мебели"
          useState={[details.furniture, toggleBoolean]}
        />
        <LabelFormField
          type="boolean"
          name="renovation"
          label="Ремонт"
          useState={[details.renovation, toggleBoolean]}
        />
      </div>
    </>
  );
};

export default EstateForm;
