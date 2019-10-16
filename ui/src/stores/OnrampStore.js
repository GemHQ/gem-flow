import { observable, action, decorate, computed } from "mobx";

const createId = () => ({ id: Math.random().toString(), created_at: Date.now().toString() });

class OnrampStore {
  usersMap = new Map();
  profilesMap = new Map();
  connectionsMap = new Map();
  accountsMap = new Map();
  transactionsMap = new Map();

  createUser = user => {
    console.log(user)
    const data = createId();
    this.usersMap.set(data.id, { ...user, ...data });
  }
  createProfile = profile => {
    this.profilesMap.set(profile.id, profile);
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

decorate(OnrampStore, {
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

export default OnrampStore;