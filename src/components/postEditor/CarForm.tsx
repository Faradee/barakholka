import FormField from "../forms/FormField";
import { useState } from "react";
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

const CarForm = () => {
  const [kilo, setkilo] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [transmission, setTransmission] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  return (
    <>
      <div className="flex">{/* <FormField type="text" /> */}</div>
    </>
  );
};

export default CarForm;
