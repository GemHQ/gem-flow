import { observable } from "mobx";
import util from "../../util";

class UserStore {
  @observable users = [];

  constructor() {
    this.getUsers();
  }

  @action getUsers = () => {
    const users = await util.httpGet("/user");
    this.setUsers(users);
  }
  
  @action setUsers = users => {
    this.users = users;
  }

  @action createUser = email => {
    const user = await util.httpPost("/user", { email });
    this.users.push(user);

  }
}

export default UserStore;