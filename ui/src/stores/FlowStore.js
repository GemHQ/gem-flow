import { observable, action, decorate, computed } from "mobx";

const createId = () => ({ id: Math.random().toString(), created_at: Date.now().toString() });

class FlowStore {
  usersMap = new Map();
  profilesMap = new Map();
  connectionsMap = new Map();
  accountsMap = new Map();
  transactionsMap = new Map();

  selectedUser = null;
  selectedProfile = null;
  selectedConnection = null;
  selectedAccount = null;

  getUsers = async () => {
    // const users = await util.httpGet("/user");
    // users.forEach(user => this.usersMap.set(user.id, user));
  }
  getProfiles = async () => {
    // const profiles = await util.httpGet("/profile");
    // profiles.forEach(user => this.profilesMap.set(profile.id, profile));
  }
  getConnections = async () => {
    // const connections = await util.httpGet("/connection");
    // users.forEach(connection => this.usersMap.set(connection.id, connection));
  }
  getAccounts = async () => {
    // const accounts = await util.httpGet("/account");
    // users.forEach(account => this.usersMap.set(account.id, account));
  }
  getTransactions = async () => {
    // const transactions = await util.httpGet("/transaction");
    // users.forEach(transaction => this.usersMap.set(transaction.id, transaction));
  }

  createUser = user => {
    const data = createId();
    this.usersMap.set(data.id, { ...user, ...data });
  }
  createProfile = profile => {
    const data = createId();
    this.profilesMap.set(data.id, { ...profile, ...data });
  }
  createConnection = connection => {
    const data = createId();
    this.connectionsMap.set(data.id, { ...connection, ...data });
  }
  createAccount = account => {
    const data = createId();
    this.accountsMap.set(data.id, { ...account, ...data, last_updated_at: data.created_at });
  }
  createTransaction = transaction => {
    const data = createId();
    this.transactionsMap.set(data.id, { ...transaction, ...data });
  }

  selectUser = id => {
    this.selectedUser = this.usersMap.get(id);
  }
  selectProfile = id => {
    this.selectedProfile = this.profilesMap.get(id);
  }
  selectConnection = id => {
    this.selectedConnection = this.connectionsMap.get(id);
  }
  selectAccount = id => {
    this.selectedAccount = this.accountsMap.get(id);
  }

  removeUser = id => {
    this.usersMap.delete(id);
  }
  removeProfile = id => {
    this.profilesMap.delete(id);
  }
  removeConnection = id => {
    this.connectionsMap.delete(id);
  }
  removeAccount = id => {
    this.accountsMap.delete(id);
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
  selectedUser: observable,
  selectedProfile: observable,
  selectedConnection: observable,
  selectedAccount: observable,
  getUsers: action,
  getProfiles: action,
  getConnections: action,
  getAccounts: action,
  getTransactions: action,
  createUser: action,
  createProfile: action,
  createConnection: action,
  createAccount: action,
  createTransaction: action,
  selectUser: action,
  selectProfile: action,
  selectConnection: action,
  selectAccount: action,
  removeUser: action,
  removeProfile: action,
  removeConnection: action,
  removeAccount: action,
  users: computed,
  profiles: computed,
  connections: computed,
  accounts: computed,
  transactions: computed,
});

export default FlowStore;