import { IconType } from "react-icons";
import { PostState } from "@/app/create/page";

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
  const { type, icon, placeholder, cols, onChange, children, name, required } =
    props;
  const Icon = icon;

  return (
    <div className="textfield  bg-white outline-black focus-within:border-black focus-within:outline focus-within:outline-2">
      {Icon && <Icon />}
      {type === "textarea" ? (
        <textarea
          className="w-full outline-none"
          value={state}
          name={name}
          cols={cols}
          placeholder={placeholder}
          onChange={(e) => {
            e.preventDefault();
            onChange ? onChange(e, setState) : setState(e.currentTarget.value);
          }}
          required={required}
        />
      ) : (
        <input
          className="w-full outline-none"
          value={state}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={(e) => {
            if (type === "number") {
              if (/^$/.test(e.currentTarget.value)) {
                e.currentTarget.value = "0";
                onChange
                  ? onChange(e, setState)
                  : setState(e.currentTarget.value);
              }
              if (!/^[1-9][0-9]*$/.test(e.currentTarget.value))
                e.currentTarget.value = e.currentTarget.value.substring(1);
            }
            if (
              type !== "number" ||
              /^[1-9][0-9]*$/.test(e.currentTarget.value)
            ) {
              onChange
                ? onChange(e, setState)
                : setState(e.currentTarget.value);
            }
          }}
          required={required}
        />
      )}
      {children}
    </div>
  );
};

export default FormField;
