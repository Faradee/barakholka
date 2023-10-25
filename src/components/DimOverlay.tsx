import { useAppSelector } from "@/redux/store";
import { setDim } from "@/redux/slices/dimSlice";
import { useDispatch } from "react-redux";
const DimOverlay = () => {
  const isDimmed = useAppSelector((state) => state.dim.isDimmed);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setDim(false))}
      className={`${
        isDimmed
          ? " z-20 opacity-70 brightness-0"
          : "pointer-events-auto hidden"
      } fixed h-full min-h-screen w-full bg-slate-300`}
    />
  );
};

export default DimOverlay;
