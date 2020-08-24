import { Form, FormFieldProps, Label } from "semantic-ui-react";

import { FieldRenderProps } from "react-final-form";
import React from "react";

interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps {}

function TextAreaInput({ input, width, rows, placeholder, meta: { touched, error } }: IProps) {
  return (
    <Form.Field error={touched && !!error}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}
export default TextAreaInput;
