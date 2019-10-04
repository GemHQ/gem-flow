import { observable, action, computed, decorate } from "mobx";
import util from "../../util";

class UserStore {
  usersMap = new Map();

  constructor() {
    this.getUsers();
  }

  getUsers = action(async () => {
    const users = await util.httpGet("/user");
    this.setUsers(users);
  })
  
  setUsers = action(users => {
    this.users = users;
  })

  @action createUser = action(async email => {
    const user = await util.httpPost("/user", { email });
    this.users.set(user.id, user);
  })

  @computed get users() {
    return [...this.usersMap.values()];
  }
}

decorate(UserStore, {
  usersMap: observable,
  getUsers: action,
  setUsers: action,
  createUser: action,
  users: computed
});

export default UserStore;
