import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/store";
import { setPostField } from "@/app/redux/slices/postSlice";
import { useEffect } from "react";
import FormField from "../forms/FormField";
import { setDetailsField } from "@/app/redux/slices/postSlice";
export type EstateState = {
  space: string;
  rooms: string;
  floor: string;
  furniture: boolean;
  renovation: string;
  type: string;
};
type EstateFormProps = {
  handleChange: React.Dispatch<any>;
};

const EstateForm = (props: EstateFormProps) => {
  const dispatch = useDispatch();
  const postData = useAppSelector((state) => state.postReducer);
  const { handleChange } = props;
  const toggleBoolean = (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(
      setDetailsField({
        [e.currentTarget.name]: e.currentTarget.checked,
      }),
    );
  };
  const details = postData.details as EstateState;
  useEffect(() => {
    const initialEstateData = {
      space: "",
      rooms: "",
      floor: "",
      furniture: false,
      renovation: "",
      balcony: "",
      type: "",
    } as EstateState;
    dispatch(setPostField({ details: initialEstateData }));
    return () => {
      dispatch(setPostField({ details: initialEstateData }));
    };
  }, [dispatch]);
  return (
    <>
      <div className="flex w-full gap-x-0.5">
        <FormField
          type="number"
          useState={[details.space, handleChange]}
          placeholder="Площадь в м^2^"
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
      <div className="flex w-full justify-start">
        <FormField
          type="boolean"
          name="furniture"
          placeholder="Наличие мебели"
          useState={[details.furniture, toggleBoolean]}
        />
      </div>
      <div className="flex w-full gap-x-0.5">
        <FormField
          type="text"
          name="brand"
          placeholder="Тип ремонта"
          useState={[details.renovation, handleChange]}
          onChange={handleChange}
          noMargin
        />
        <FormField
          type="text"
          name="model"
          placeholder="Вид недвижимости"
          useState={[details.type, handleChange]}
          onChange={handleChange}
          noMargin
        />
      </div>
    </>
  );
};

export default EstateForm;
