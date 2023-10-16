import React from "react";
type ButtonProps = {
  onClick: (...args: any[]) => void;
  title: string;
  color?: string;
};
const Button = (props: ButtonProps) => {
  const { onClick, title, color } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 w-full rounded-md font-semibold text-white ${
        color ? color : "bg-red-600 hover:bg-red-700 active:bg-red-800"
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
