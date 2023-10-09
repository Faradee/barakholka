import React from "react";
import FormField, { FormFieldProps } from "./FormField";
type LabelFormFieldProps = FormFieldProps & {
  label: string;
};
const LabelFormField = (props: LabelFormFieldProps) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={props.name}>{props.label}: </label>
      <FormField {...props} />
    </div>
  );
};

export default LabelFormField;
