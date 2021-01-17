import { Button, Form } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import React, { useContext } from "react";

import { IUserFormValues } from "../../app/Models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import TextInput from "../../app/common/form/TextInput";

function LoginForm() {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => login(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field name='password' component={TextInput} placeholder='Password' type="password" />
          <Button positive content='Login' />
        </Form>
      )}
    />
  );
}

export default LoginForm