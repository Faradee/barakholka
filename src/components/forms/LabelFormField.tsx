import React from "react";
import FormField, { FormFieldProps } from "./FormField";
type LabelFormFieldProps = FormFieldProps & {
  label: string;
};
const LabelFormField = (props: LabelFormFieldProps) => {
  return (
    <div className="mx-0.5 flex w-full flex-col">
      <label htmlFor={props.name}>{props.label}: </label>
      <FormField {...props} noMargin />
    </div>
  );
};

export default LabelFormField;
