import FormField from "./FormField";
import LabelFormField from "./LabelFormField";
type DataFormProps<T> = {
  state: { [P in keyof T]: string | boolean };
  handleChange: (key: keyof T) => (stateValue: string) => void;

  label?: string[];
  className?: string;
};
// <{ [P in keyof T]: string | boolean }[keyof T]>
const DataForm = <T,>({
  state,
  handleChange,
  label,
  className,
}: DataFormProps<T>): JSX.Element => {
  const getFormType = (key: keyof typeof state) => {
    if (typeof state[key] === "boolean") return "boolean";
    if (typeof state[key] === "number") return "number";
    switch (key) {
      case "email":
        return "email";
      case "password" || "originalPassword" || "confirmPassword":
        return "password";
      case "description":
        return "textarea";
      default:
        return "text";
    }
  };
  const stateKeys = Object.keys(state) as (keyof typeof state)[];
  return (
    <>
      {stateKeys.map((key, index) => {
        if (!label)
          return (
            <FormField
              key={index}
              type={getFormType(key)}
              useState={[state[key], handleChange(key)]}
              name={key.toString()}
              className={className}
            />
          );
        else
          return (
            <LabelFormField
              key={index}
              type={getFormType(key)}
              useState={[state[key], handleChange(key)]}
              name={key.toString()}
              className={className}
              label={index < label.length - 1 ? label[index] : ""}
            />
          );
      })}
    </>
  );
};

export default DataForm;
