import { Button, Icon, Item, Segment } from "semantic-ui-react";

import { IActivity } from "../../../app/Models/activity";
import { Link } from "react-router-dom";
import React from "react";
import {format} from 'date-fns';

function ActivityListItem({ activity }: { activity: IActivity }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{format(activity.date, 'h:mm a')}</Item.Meta>
              <Item.Description>Hosted by Jonny</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {format(activity.date, 'h:mm a')}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`} />
      </Segment>
    </Segment.Group>
  );
}

export default ActivityListItem;
