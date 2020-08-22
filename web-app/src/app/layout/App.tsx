import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import {ToastContainer} from 'react-toastify';

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
