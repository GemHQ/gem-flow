import { observable, action, decorate, computed } from "mobx";
import { ScreenNames, Endpoints } from "./Constants";
import { httpGet, httpPost, httpDelete } from '../util/RequestUtil';
import { formatProfileRequestBody } from "./StoresUtil";

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
  }

  getUsers = async () => {
    const { data, status } = await httpGet(Endpoints.USER);
    if (status >= 400) return;
    data.forEach(user => this.usersMap.set(user.id, user));
  }
  getProfiles = async (userId) => {
    const { data, status } = await httpGet(`${Endpoints.PROFILE}/${userId}`);
    if (status >= 400) return;
    data.forEach(profile => this.profilesMap.set(profile.id, profile));
  }
  getConnections = async () => {
    const { data, status } = await httpGet(Endpoints.INSTITUTION_USER);
    if (status >= 400) return;
    data.forEach(connection => this.connectionsMap.set(connection.id, connection));
  }
  getAccounts = async () => {
    const { data, status } = await httpGet(Endpoints.ACCOUNT);
    if (status >= 400) return;
    data.forEach(account => this.accountsMap.set(account.id, account));
  }
  getTransactions = async () => {}

  createUser = async user => {
    const { data, status } = await httpPost(Endpoints.USER, { user });
    if (status >= 400) return;
    this.usersMap.set(data.id, { ...data, ...user });
  }
  createProfile = async profileFormData => {
    const profile = formatProfileRequestBody(profileFormData);
    const userId = this.selectedUser.id;
    const { data, status } = await httpPost(Endpoints.PROFILE, { userId, profile });
    if (status >= 400) return;
    this.profilesMap.set(data.id, { ...data, profileName: profileFormData.profileName });
  }
  createConnection = async connection => {
    const { data, status } = await httpPost(Endpoints.INSTITUTION_USER, connection);
    if (status >= 400) return;
    this.connectionsMap.set(data.id, { ...data, connectionName: connection.name });
  }
  createAccount = async account => {
    const { data, status } = await httpPost(Endpoints.ACCOUNT, account);
    if (status >= 400) return;
    this.accountsMap.set(data.id, { ...data, accountName: account.name });
  }
  createTransaction = async transaction => {
    const { data, status } = await httpPost(Endpoints.TRANSACTION, transaction);
    if (status >= 400) return;
    this.transactionsMap.set(data.id, data);
  }

  selectUser = id => {
    if (this.selectedUser && id === this.selectedUser.id) return;
    this.selectedUser = this.usersMap.get(id);
    this.selectedProfile = null;
    this.selectedConnection = null;
    this.selectedAccount = null;
    this.getProfiles(id);
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
    httpDelete(`${Endpoints.USER}/${id}`);
  }
  removeProfile = id => {
    this.profilesMap.delete(id);
    httpDelete(`${Endpoints.PROFILE}/${id}`);
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