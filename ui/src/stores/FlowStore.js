import { observable, action, decorate, computed } from "mobx";
import { ScreenNames } from "./Constants";
import { httpGet, httpPost, httpDelete } from '../util/RequestUtil';
import { formatProfileRequestBody } from "./StoresUtil";

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

  constructor() {
    this.getUsers();
    // this.getProfiles();
  }

  getUsers = async () => {
    const users = await httpGet("/user");
    users.forEach(user => this.usersMap.set(user.id, user));
  }
  getProfiles = async () => {
    const profiles = await httpGet("/profile");
    profiles.forEach(profile => this.profilesMap.set(profile.id, profile));
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

  createUser = async ({ email }) => {
    const result = await httpPost("/user", { email });
    this.usersMap.set(result.id, { ...result, email });
  }
  createProfile = async profile => {
    const data = createId();
    this.profilesMap.set(data.id, { ...profile, ...data });
    // const body = formatProfileRequestBody(profile);
    // const result = await httpPost("/profile", body);
    // this.profilesMap.set(result.id, { ...result, profileName: profile.profileName });
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
    if (this.selectedUser && id === this.selectedUser.id) return;
    this.selectedUser = this.usersMap.get(id);
    this.selectedProfile = null;
    this.selectedConnection = null;
    this.selectedAccount = null;
  }
  selectProfile = id => {
    if (this.selectedProfile && id === this.selectedProfile.id) return;
    this.selectedProfile = this.profilesMap.get(id);
    this.selectedConnection = null;
    this.selectedAccount = null;
  }
  selectConnection = id => {
    if (this.selectedConnection && id === this.selectedConnection.id) return;
    this.selectedConnection = this.connectionsMap.get(id);
    this.selectedAccount = null;
  }
  selectAccount = id => {
    if (this.selectedAccount && id === this.selectedAccount.id) return;
    this.selectedAccount = this.accountsMap.get(id);
  }

  removeUser = id => {
    this.usersMap.delete(id);
    httpDelete(`/user/${id}`);
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
    return [...this.usersMap.values()].reverse();
  }
  get profiles() {
    return [...this.profilesMap.values()].reverse();
  }
  get connections() {
    return [...this.connectionsMap.values()].reverse();
  }
  get accounts() {
    return [...this.accountsMap.values()].reverse();
  }
  get transactions() {
    return [...this.transactionsMap.values()].reverse();
  }

  // which dots are filled in the progress map
  get dots() {
    return [
      [ScreenNames.USER, Boolean(this.selectedUser)],
      [ScreenNames.PROFILE, Boolean(this.selectedProfile)],
      [ScreenNames.CONNECTION, Boolean(this.selectedConnection)],
      [ScreenNames.ACCOUNT, Boolean(this.selectedAccount)],
      [ScreenNames.TRANSACTION, Boolean(this.transactionsMap.size)],
    ]
  }

  // subtitles for the markers on the progress map
  get markerSubtitles() {
    return {
      [ScreenNames.USER]: this.determineSubtitle('User', 'email', this.selectedUser, this.usersMap.size, 'Create a new user'),
      [ScreenNames.PROFILE]: this.determineSubtitle('Profile', 'profileName', this.selectedProfile, this.profilesMap.size),
      [ScreenNames.CONNECTION]: this.determineSubtitle('Connection', 'name', this.selectedConnection, this.connectionsMap.size),
      [ScreenNames.ACCOUNT]: this.determineSubtitle('Account', 'name', this.selectedAccount, this.accountsMap.size),
      [ScreenNames.TRANSACTION]: this.transactionsMap.size ? `${this.transactionsMap.size} Transactions` : '-',
    }
  }

  determineSubtitle(itemTitle, itemKey, selectedItem, numberOfItems, placeholder = '-') {
    return selectedItem ? selectedItem[itemKey] : (numberOfItems ? `${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}` : placeholder)
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
  dots: computed,
  markerSubtitles: computed,
});

export default FlowStore;