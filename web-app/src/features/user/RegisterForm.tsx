import { Button, Form, Header } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import React, { useContext } from "react";

import { IUserFormValues } from "../../app/Models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import TextInput from "../../app/common/form/TextInput";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  username: isRequired("username"),
  displayname: isRequired("display name"),
  email: isRequired("email"),
  password: isRequired("password"),
});

function RegisterForm() {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field name="displayname" component={TextInput} placeholder="Display Name" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError}/>
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
}

export default RegisterForm;
