import { IUser, IUserFormValues } from "../Models/user";
import { action, computed, observable, runInAction } from "mobx";

import { RootStore } from "./rootStore";
import agent from "../api/agent";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
          this.user = user;
      })
      console.log(user);
    } catch (error) {
        console.log(error)
    }
  };
}
