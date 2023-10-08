import { useDispatch } from "react-redux";
import FormField from "../forms/FormField";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/app/redux/store";
import { setPostField } from "@/app/redux/slices/postSlice";
export type CarState = {
  kilometrage: string;
  year: string;
  transmission: string;
  brand: string;
  model: string;
  color: string;
  engine: string;
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
      engine: "",
      damaged: false,
    } as CarState;
    dispatch(setPostField({ details: initialCarData }));
  }, [dispatch]);
  return (
    <>
      <div className="flex">
        <FormField
          type="number"
          useState={[details.kilometrage, handleChange]}
          name="kilometrage"
          onChange={handleChange}
        />
        <FormField
          type="number"
          name="year"
          useState={[details.year, handleChange]}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default CarForm;
