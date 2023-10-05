import { IconType } from "react-icons";

type FormFieldProps = {
  type: "text" | "password" | "email";
  icon?: IconType;
  useState: [string, React.Dispatch<React.SetStateAction<string>>];
  placeholder?: string;
  onChange?: (
    e: React.FormEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  children?: React.ReactNode;
};

const FormField = (props: FormFieldProps) => {
  const [state, setState] = props.useState;
  const Icon = props.icon;
  return (
    <div className="textfield  outline-black focus-within:border-black focus-within:outline focus-within:outline-2">
      {Icon && <Icon />}
      <input
        className="w-full outline-none"
        value={state}
        placeholder={props.placeholder}
        type={props.type}
        onChange={(e) =>
          props.onChange
            ? props.onChange(e, setState)
            : setState(e.currentTarget.value)
        }
      />
      {props.children}
    </div>
  );
};

export default FormField;