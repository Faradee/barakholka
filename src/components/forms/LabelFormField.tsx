import FormField, { FormFieldProps } from "./FormField";
type LabelFormFieldProps = FormFieldProps & {
  label: string;
  labelClassName?: string;
};
const LabelFormField = (props: LabelFormFieldProps) => {
  return (
    <div className="mx-2 flex">
      <label className={props.labelClassName} htmlFor={props.name}>
        {props.label}{" "}
      </label>
      <FormField {...props} noMargin />
    </div>
  );
};

export default LabelFormField;
