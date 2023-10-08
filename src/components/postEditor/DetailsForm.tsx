import { setDetailsField } from "@/app/redux/slices/postSlice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import CarForm, { CarState } from "./CarForm";
import EstateForm, { EstateState } from "./EstateForm";
import { PostState } from "@/app/create/page";

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Data = {
  [P in KeysOfUnion<CarState | EstateState>]?: string | boolean;
};
const DetailsForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postType = useAppSelector((state) => state.postReducer.type);
  const handleChange: React.Dispatch<React.SetStateAction<any>> = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(
      setDetailsField({
        [e.currentTarget.name]: e.currentTarget.value,
      } as any),
    );
  };
  return (
    <>
      {postType === "car" ? (
        <CarForm handleChange={handleChange} />
      ) : postType === "estate" ? (
        <EstateForm />
      ) : (
        <></>
      )}
    </>
  );
};

export default DetailsForm;
