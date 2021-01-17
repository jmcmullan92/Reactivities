import { Button, Form, Label } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import React, { useContext } from "react";

import { IUserFormValues } from "../../app/Models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import TextInput from "../../app/common/form/TextInput";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators ({
  email: isRequired('email'),
  password: isRequired('password')
})

function LoginForm() {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
        [FORM_ERROR]: error
      }))}
      render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field name='password' component={TextInput} placeholder='Password' type="password" />
          {submitError && !dirtySinceLastSubmit && (<Label color='red' basic content={submitError.statusText} />)}
          <Button disabled={invalid && !dirtySinceLastSubmit || pristine} loading={submitting} positive content='Login' />
          <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
        </Form>
      )}
    />
  );
}

export default LoginForm