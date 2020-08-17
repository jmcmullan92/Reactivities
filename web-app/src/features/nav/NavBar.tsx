import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

function NavBar() {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: "10px" }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} exact to='/activities' />
        <Menu.Item>
          <Button positive content='Create Activity' as={NavLink} exact to='/createActivity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(NavBar);
