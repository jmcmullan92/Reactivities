import React, { Fragment, useContext, useEffect } from "react";
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
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import ModalContainer from '../common/modals/ModalContainer';

function App({ location }: RouteComponentProps) {

  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if(token) {
      getUser().finally(() => setAppLoaded());
    }
    else{
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if(!appLoaded) return <LoadingComponent content="Loading app..." />

  return (
    <Fragment>
      <ModalContainer/>
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
