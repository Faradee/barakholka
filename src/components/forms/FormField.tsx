import { IconType } from "react-icons";
import { PostState } from "../postEditor/PostEditor";

type EventPointer =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

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
        />
      ) : (
        <input
          className="w-full outline-none"
          value={state}
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
          onChange={(e) =>
            props.onChange
              ? props.onChange(e, setState)
              : setState(e.currentTarget.value)
          }
        />
      )}
      {props.children}
    </div>
  );
};

export default FormField;
