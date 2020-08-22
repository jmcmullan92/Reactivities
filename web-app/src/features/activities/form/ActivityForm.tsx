import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}
function ActivityForm({ match, history }: RouteComponentProps<DetailParams>) {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if(match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(()=> initialFormState && setActivity(initialFormState))
    }

    return function cleanup(){
      clearActivity();
    }
  },[loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length]);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handlSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));

    } else {
      editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
      <Segment clearing>
      <Form onSubmit={handlSubmit}>
        <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          placeholder='Description'
          value={activity.description}
        />
        <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category} />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
        />
        <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city} />
        <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} />
        <Button floated='right' positive type='submit' content='Submit' loading={submitting} />
        <Button onClick={() => history.push('/activities')} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
      </Grid.Column>
    </Grid>
    
  );
}

export default observer(ActivityForm);
