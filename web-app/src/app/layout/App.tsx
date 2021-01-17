import React, { Fragment } from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/user/LoginForm";
import NavBar from "../../features/nav/NavBar";
import NotFound from "./NotFound";
import {ToastContainer} from 'react-toastify';
import { observer } from "mobx-react-lite";

function App({ location }: RouteComponentProps) {
  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
      <Route exact path='/' component={HomePage} />
      <Route
        exact
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route key={location.key} exact path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                <Route exact path='/activities/:id' component={ActivityDetails} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default withRouter(observer(App));
