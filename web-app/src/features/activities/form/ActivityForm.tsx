import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import React, { useContext, useEffect, useState } from "react";
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from "revalidate";

import { ActivityFormValues } from "../../../app/Models/activity";
import DateInput from "../../../app/common/form/DateInput";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import SelectInput from "../../../app/common/form/SelectInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import TextInput from "../../../app/common/form/TextInput";
import { category } from "../../../app/common/options/categoryOptions";
import { combineDateAndTime } from "../../../app/common/util/util";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";

const validate = combineValidators({
  title: isRequired({ message: "Event title is required" }),
  category: isRequired({ message: "Event category is requried" }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({ message: "Description needs to be at least 5 characters" })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
  time: isRequired("Time"),
});

interface DetailParams {
  id: string;
}
function ActivityForm({ match, history }: RouteComponentProps<DetailParams>) {
  const rootStore = useContext(RootStoreContext);
  const { createActivity, editActivity, submitting, loadActivity } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field name='title' placeholder='Title' value={activity.title} component={TextInput} />
                <Field
                  component={TextAreaInput}
                  rows={3}
                  name='description'
                  placeholder='Description'
                  value={activity.description}
                />
                <Field
                  name='category'
                  placeholder='Category'
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                />
                <Form.Group widths='equal' inline>
                  <Field component={DateInput} name='date' date={true} placeholder='Date' value={activity.date} />
                  <Field component={DateInput} name='time' time={true} placeholder='Time' value={activity.time} />
                </Form.Group>
                <Field component={TextInput} name='city' placeholder='City' value={activity.city} />
                <Field component={TextInput} name='venue' placeholder='Venue' value={activity.venue} />
                <Button
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                />
                <Button
                  onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.goBack()}
                  floated='right'
                  type='button'
                  content='Cancel'
                  disabled={loading}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityForm);
