import React, { useContext, useEffect } from "react";

import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";
import { Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface DetailParams {
  id:string
}
function ActivityDetails({match, history} :RouteComponentProps<DetailParams>) {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history])

  if(loadingInitial){
    return <LoadingComponent content="Loading activity..."/>
  } 

  if(!activity)
  {
    return (<h2>Activity not found</h2>);
  }
  
  

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
      <ActivityDetailedSideBar/>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDetails);
