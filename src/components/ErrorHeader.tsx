import { useAppSelector } from "@/redux/store";
import React from "react";

const ErrorHeader = () => {
  const error = useAppSelector((state) => state.error.error);
  const errorMessage = (error: string | null) => {
    switch (error) {
      case "SizeError":
        return "Суммарный размер файлов не должен превышать 5MB!";
      case "TypeError":
        return "Файл должен быть разрешения .webp, .img или .png";
      default:
        return "";
    }
  };
  return (
    <div className="flex w-full justify-center p-1 text-red-600">
      <span>{errorMessage(error)}</span>
    </div>
  );
};

export default ErrorHeader;
