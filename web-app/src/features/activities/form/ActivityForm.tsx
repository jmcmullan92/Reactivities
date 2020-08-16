import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export function ActivityForm({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting
}: IProps) {
  function initializeForm() {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  }

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    } 
    else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handlSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button floated="right" positive type="submit" content="Submit" loading={submitting} />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
