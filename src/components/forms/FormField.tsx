import { IconType } from "react-icons";

type FormFieldProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  type: "text" | "password" | "email";
  icon?: IconType;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
};

const FormField = (props: FormFieldProps, children: React.ReactNode) => {
  const Icon = props.icon;
  return (
    <div onClick={props.onClick} className="textfield">
      {Icon && <Icon />}
      <input
        className="w-full outline-none outline-black focus-within:outline-2"
        value={props.state}
        placeholder={props.placeholder}
        type={props.type}
        onChange={(e) => props.onChange && props.onChange(e)}
      />
      {children}
    </div>
  );
};

export default FormField;
