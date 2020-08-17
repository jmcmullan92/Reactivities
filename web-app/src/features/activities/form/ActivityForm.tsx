import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}
function ActivityForm({ match }: RouteComponentProps<DetailParams>) {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen,
    activity: initialFormState,
    loadActivity,
  } = activityStore;

  useEffect(() => {
    if(match.params.id) {
      loadActivity(match.params.id).then(()=> initialFormState && setActivity(initialFormState))
    }
  });


  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

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
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
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
        <Button onClick={cancelFormOpen} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);
