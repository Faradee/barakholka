import { IconType } from "react-icons";

export type FormFieldProps = {
  type: "text" | "password" | "email" | "number" | "textarea" | "boolean";
  icon?: IconType;
  useState: [string | boolean, React.Dispatch<React.SetStateAction<any>>];
  name: string;
  placeholder?: string;
  cols?: number;
  onChange?: (
    e: React.ChangeEvent | React.MouseEvent,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  children?: React.ReactNode;
  noMargin?: boolean;
  required?: boolean;
};

const FormField = (props: FormFieldProps) => {
  const [state, setState] = props.useState;
  const {
    type,
    icon,
    placeholder,
    cols,
    onChange,
    children,
    name,
    required,
    noMargin,
  } = props;
  const Icon = icon;
  //Решает нерабочее поведение input number в браузерах Firefox
  const preventFirefoxNumberInput = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (
      navigator.userAgent.includes("Firefox") &&
      !/[0-9]|[\b]/.test(e.key) &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
    }
  };
  return (
    <label
      className="textfield  mx-0.5 bg-white outline-black focus-within:border-black focus-within:outline focus-within:outline-2"
      style={
        type === "boolean"
          ? {
              width: "50px",
              height: "25px",
              borderRadius: "9999px",
              padding: "0 2px",
              display: "flex",
              backgroundColor:
                state === true ? "rgb(34, 197, 94)" : "rgb(226 232 240)",
              transition: "background-color 0.3s",
              justifyContent: state === true ? "end" : "start",
            }
          : noMargin
          ? { marginRight: "0", marginLeft: "0" }
          : {}
      }
    >
      {Icon && <Icon />}
      {type === "textarea" ? (
        <textarea
          className="w-full outline-none"
          value={state as string}
          name={name}
          cols={cols}
          placeholder={placeholder}
          onChange={(e) => {
            e.preventDefault();
            onChange ? onChange(e, setState) : setState(e.currentTarget.value);
          }}
          required={required}
        />
      ) : type === "boolean" ? (
        <>
          <input
            type="checkbox"
            name={name}
            checked={state as boolean}
            className="hidden"
            onClick={(e) => {
              setState(e);
            }}
          />
          <div className="h-[20px] w-[20px] rounded-full bg-white shadow-lg shadow-black"></div>
        </>
      ) : (
        <input
          className="w-full outline-none"
          value={state as string}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={(e) => {
            if (
              type !== "number" ||
              /^[1-9][0-9]*$/.test(e.currentTarget.value) ||
              e.currentTarget.value === ""
            ) {
              onChange
                ? onChange(e, setState)
                : setState(e.currentTarget.value);
            }
          }}
          onKeyDown={
            type === "number" ? (e) => preventFirefoxNumberInput(e) : undefined
          }
          required={required}
        />
      )}
      {children}
    </label>
  );
};

export default FormField;
