import { observable, action, decorate, computed } from "mobx";

const createId = () => ({ id: Math.random().toString(), created_at: Date.now().toString() });

class FlowStore {
  usersMap = new Map();
  profilesMap = new Map();
  connectionsMap = new Map();
  accountsMap = new Map();
  transactionsMap = new Map();

  getUsers = async () => {
    // const users = await util.httpGet("/user");
    // users.forEach(user => this.usersMap.set(user.id, user));
  }

  createUser = user => {
    const data = createId();
    this.usersMap.set(data.id, { ...user, ...data });
  }
  createProfile = profile => {
    const data = createId();
    console.log(profile)
    this.profilesMap.set(data.id, { ...profile, ...data });
  }
  createConnection = connection => {
    this.connectionsMap.set(connection.id, connection);
  }
  createAccount = account => {
    this.accountsMap.set(account.id, account);
  }
  createTransaction = transaction => {
    this.transactionsMap.set(transaction.id, transaction);
  }

  removeUser = id => {
    this.usersMap.delete(id);
  }
  removeProfile = id => {
    this.profilesMap.delete(id);
  }

  get users() {
    return [...this.usersMap.values()];
  }
  get profiles() {
    return [...this.profilesMap.values()];
  }
  get connections() {
    return [...this.connectionsMap.values()];
  }
  get accounts() {
    return [...this.accountsMap.values()];
  }
  get transactions() {
    return [...this.transactionsMap.values()];
  }
}

decorate(FlowStore, {
  usersMap: observable,
  profilesMap: observable,
  connectionsMap: observable,
  accountsMap: observable,
  transactionsMap: observable,
  createUser: action,
  createProfile: action,
  createConnection: action,
  createAccount: action,
  createTransaction: action,
  users: computed,
  profiles: computed,
  connections: computed,
  accounts: computed,
  transactions: computed,
});

export default FlowStore;