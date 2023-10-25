import { setDetailsField } from "@/redux/slices/postSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import CarForm from "./CarForm";
import EstateForm from "./EstateForm";

const DetailsForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postType = useAppSelector((state) => state.post.type);
  const handleChange: React.Dispatch<React.SetStateAction<any>> = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(
      setDetailsField({
        [e.currentTarget.name]: e.currentTarget.value,
      }),
    );
  };
  return (
    <>
      {postType === "car" ? (
        <CarForm handleChange={handleChange} />
      ) : postType === "estate" ? (
        <EstateForm handleChange={handleChange} />
      ) : (
        <></>
      )}
    </>
  );
};

export default DetailsForm;
