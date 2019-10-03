import { observable, action, computed } from "mobx";
import util from "../../util";

class UserStore {
  @observable usersMap = new Map();

  constructor() {
    this.getUsers();
  }

  @action getUsers = async () => {
    const users = await util.httpGet("/user");
    this.setUsers(users);
  }
  
  @action setUsers = users => {
    this.users = users;
  }

  @action createUser = async email => {
    const user = await util.httpPost("/user", { email });
    this.users.set(user.id, user);
  }

  @computed get users() {
    return [...this.usersMap.values()];
  }
}

export default UserStore;
