import { IconType } from "react-icons";
import { PostState } from "../postEditor/PostEditor";

type FormFieldProps = {
  type: "text" | "password" | "email" | "number" | "textarea";
  icon?: IconType;
  useState: [string, React.Dispatch<React.SetStateAction<any>>];
  placeholder?: string;
  cols?: number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  children?: React.ReactNode;
  name?: string;
  required?: boolean;
};

const FormField = (props: FormFieldProps) => {
  const [state, setState] = props.useState;
  const Icon = props.icon;
  return (
    <div className="textfield  bg-white outline-black focus-within:border-black focus-within:outline focus-within:outline-2">
      {Icon && <Icon />}
      {props.type === "textarea" ? (
        <textarea
          className="w-full outline-none"
          value={state}
          name={props.name}
          cols={props.cols}
          placeholder={props.placeholder}
          onChange={(e) =>
            props.onChange
              ? props.onChange(e, setState)
              : setState(e.currentTarget.value)
          }
          required={props.required}
        />
      ) : (
        <input
          className="w-full outline-none"
          value={state}
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
          onChange={(e) => {
            if (
              props.type !== "number" ||
              /[0 - 9]/.test(e.currentTarget.value)
            ) {
              props.onChange
                ? props.onChange(e, setState)
                : setState(e.currentTarget.value);
            }
          }}
          required={props.required}
        />
      )}
      {props.children}
    </div>
  );
};

export default FormField;
