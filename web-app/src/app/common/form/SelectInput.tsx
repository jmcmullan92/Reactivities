import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string, HTMLSelectElement>, FormFieldProps {}

function SelectInput({ input, width, options, placeholder, meta: { touched, error } }: IProps) {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        values={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}
export default SelectInput;