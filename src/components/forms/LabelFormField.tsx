import FormField, { FormFieldProps } from "./FormField";
type LabelFormFieldProps = FormFieldProps & {
  label: string;
};
const LabelFormField = (props: LabelFormFieldProps) => {
  return (
    <div className="mx-2 flex flex-col lg:flex-row">
      <label className="lg:w-48 lg:text-right" htmlFor={props.name}>
        {props.label}{" "}
      </label>
      <FormField {...props} noMargin />
    </div>
  );
};

export default LabelFormField;
