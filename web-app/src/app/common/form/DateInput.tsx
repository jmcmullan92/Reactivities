import { Form, FormFieldProps, Label } from "semantic-ui-react";

import { DateTimePicker } from "react-widgets";
import { FieldRenderProps } from "react-final-form";
import React from "react";

interface IProps extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps {}

function DateInput({
  input,
  width,
  placeholder,
  date = false,
  time = false,
  id,
  meta: { touched, error },
  ...rest
}: IProps) {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        {...rest}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default DateInput;
