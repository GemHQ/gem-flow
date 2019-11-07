import { observable, action, decorate, computed } from "mobx";
import { ScreenNames, Endpoints, InstitutionIcons } from "./Constants";
import { httpGet, httpPost, httpDelete } from '../util/RequestUtil';
import { formatProfileRequestBody, formatConnectionRequestBody } from "./StoresUtil";

class FlowStore {
  usersMap = new Map();
  profilesMap = new Map();
  institutionUsersMap = new Map();
  accountsMap = new Map();
  transactionsMap = new Map();
  institutionMap = new Map();

  selectedUser = null;
  selectedProfile = null;
  selectedInstitutionUser = null;
  selectedAccount = null;

  isFetching = false;
  isPosting = false;
  errorMessage = '';

  constructor() {
    this.getUsers();
    this.getInstitutions();
  }

  getItems = async (path, itemMap) => {
    this.isFetching = true;
    const { data, status } = await httpGet(path);
    this.isFetching = false;
    if (status >= 400) {
      return this.setError(data.description);
    }
    data.forEach(item => itemMap.set(item.id, item));
  }
  getUsers = async () => {
    return await this.getItems(Endpoints.USER, this.usersMap);
  }
  getProfiles = async () => {
    return await this.getItems(`${Endpoints.PROFILE}/${this.selectedUser.id}`, this.profilesMap);
  }
  getInstitutionUsers = async () => {
    return this.getItems(`${Endpoints.INSTITUTION_USER}${Endpoints.PROFILE}/${this.selectedProfile.id}`, this.institutionUsersMap);
  }
  getAccounts = async () => {
    return await this.getItems(`${Endpoints.ACCOUNT}/list/${this.selectedInstitutionUser.connection_id}`, this.accountsMap);
  }
  getTransactions = async () => {
    return await this.getItems(`${Endpoints.TRANSACTION}/list/${this.selectedAccount.id}`, this.transactionsMap);
  }
  getInstitutions = async () => {
    const { data, status } = await httpGet(Endpoints.INSTITUTION);
    if (status >= 400) return;
    data.forEach(institution => this.institutionMap.set(institution.id, {
      ...institution, 
      icon: InstitutionIcons[institution.id]
    }));
  }

  createItem = async (path, body, itemMap, defaultError) => {
    const { data, status } = await httpPost(path, body);
    if (status >= 400) return this.setError(data.description || defaultError);
    itemMap.set(data.id, data);
  }
  createUser = async user => {
    const { data, status } = await httpPost(Endpoints.USER, { user });
    if (status >= 400) return this.setError(data.description);
    this.usersMap.set(data.id, { ...data, ...user });
  }
  createProfile = async profileFormData => {
    const profile = formatProfileRequestBody(profileFormData);
    const userId = this.selectedUser.id;
    const { data, status } = await httpPost(Endpoints.PROFILE, { userId, profile });
    if (status >= 400) return this.setError(data.description);
    this.selectProfile(data.id);
    this.profilesMap.set(data.id, { ...data, profileName: profileFormData.profileName });
    await httpPost(Endpoints.PROFILE_DOCUMENT, { profileId: data.id, document: profileFormData.document });
  }
  createInstitutionUser = async connectionFormData => {
    const connection = formatConnectionRequestBody(this.selectedProfile.id, connectionFormData);
    const { status, data } = await httpPost(Endpoints.INSTITUTION_USER, connection);
    if (status >= 400) return this.setError(data.description);
    this.getInstitutionUsers();
  }
  createAccount = async account => {
    const { data, status } = await httpPost(Endpoints.ACCOUNT, account);
    if (status >= 400) return this.setError(data.description);
    this.accountsMap.set(data.id, data);
  }
  createTransaction = async transaction => {
    const { data, status } = await httpPost(Endpoints.TRANSACTION, transaction);
    if (status >= 400) return this.setError(data.description);
    this.transactionsMap.set(data.id, data);
  }

  selectUser = id => {
    if (this.selectedUser && id === this.selectedUser.id) return;
    this.selectedUser = this.usersMap.get(id);
    this.clearProfiles();
    this.clearInstitutionUsers();
    this.clearAccounts();
    this.getProfiles();
  }
  selectProfile = id => {
    if (this.selectedProfile && id === this.selectedProfile.id) return;
    this.selectedProfile = this.profilesMap.get(id);
    this.clearInstitutionUsers();
    this.clearAccounts();
    this.getInstitutionUsers();
  }
  selectInstitutionUser = id => {
    if (this.selectedInstitutionUser && id === this.selectedInstitutionUser.id) return;
    this.selectedInstitutionUser = this.institutionUsersMap.get(id);
    this.clearAccounts();
    this.getAccounts();
  }
  selectAccount = id => {
    if (this.selectedAccount && id === this.selectedAccount.id) return;
    this.selectedAccount = this.accountsMap.get(id);
    this.clearTransactions();
    this.getTransactions();
  }

  removeUser = id => {
    this.usersMap.delete(id);
    httpDelete(`${Endpoints.USER}/${id}`);
  }
  removeProfile = id => {
    this.profilesMap.delete(id);
    httpDelete(`${Endpoints.PROFILE}/${id}`);
  }
  removeInstitutionUser = id => {
    this.institutionUsersMap.delete(id);
  }
  removeAccount = id => {
    this.accountsMap.delete(id);
  }

  clearProfiles = () => {
    this.selectedProfile = null;
    this.profilesMap.clear();
  }
  clearInstitutionUsers = () => {
    this.selectedInstitutionUser = null;
    this.institutionUsersMap.clear();
  }
  clearAccounts = () => {
    this.selectedAccount = null;
    this.accountsMap.clear();
  }
  clearTransactions = () => {
    this.transactionsMap.clear();
  }
  clearItemsOnScreenChange = screenName => {
    switch (screenName) {
      case ScreenNames.USER:
        this.selectedUser = null;
        this.clearProfiles();
        this.clearInstitutionUsers();
        this.clearAccounts();
        this.clearTransactions();
        break;
      case ScreenNames.PROFILE:
        this.selectedProfile = null;
        this.clearInstitutionUsers();
        this.clearAccounts();
        this.clearTransactions();
        break;
      case ScreenNames.CONNECTION: 
        this.selectedInstitutionUser = null;
        this.clearAccounts();
        this.clearTransactions();
        break;
      case ScreenNames.ACCOUNT: 
        this.selectedAccount = null;
        this.clearTransactions();
        break;
      default: return;
    }
  }

  clearError = () => {
    this.errorMessage = '';
  }
  setError = errorMessage => {
    // errorMessage may be null, hence default value in the params (message = 'Unknown Error') will not work
    this.errorMessage = errorMessage || 'Unknown Error';
  }

  get users() {
    return [...this.usersMap.values()].reverse();
  }
  get profiles() {
    return [...this.profilesMap.values()].reverse();
  }
  get connections() {
    return [...this.institutionUsersMap.values()].reverse();
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
      [ScreenNames.CONNECTION, Boolean(this.selectedInstitutionUser)],
      [ScreenNames.ACCOUNT, Boolean(this.selectedAccount)],
      [ScreenNames.TRANSACTION, Boolean(this.transactionsMap.size)],
    ]
  }

  // subtitles for the markers on the progress map
  get markerSubtitles() {
    return {
      [ScreenNames.USER]: this.determineSubtitle('User', 'id', this.selectedUser, this.usersMap.size, 'Create a new user'),
      [ScreenNames.PROFILE]: this.determineSubtitle('Profile', 'id', this.selectedProfile, this.profilesMap.size),
      [ScreenNames.CONNECTION]: this.determineSubtitle('Connection', 'connection_id', this.selectedInstitutionUser, this.institutionUsersMap.size),
      [ScreenNames.ACCOUNT]: this.determineSubtitle('Account', 'id', this.selectedAccount, this.accountsMap.size),
      [ScreenNames.TRANSACTION]: this.determineSubtitle('Transaction', '', null, this.transactionsMap.size),
    }
  }

  determineSubtitle(itemTitle, itemKey, selectedItem, numberOfItems, placeholder = '-') {
    return selectedItem ? selectedItem[itemKey] : (numberOfItems ? `${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}` : placeholder)
  }
}

decorate(FlowStore, {
  usersMap: observable,
  profilesMap: observable,
  institutionUsersMap: observable,
  accountsMap: observable,
  transactionsMap: observable,
  institutionMap: observable,
  selectedUser: observable,
  selectedProfile: observable,
  selectedInstitutionUser: observable,
  selectedAccount: observable,
  isFetching: observable,
  errorMessage: observable,
  getItems: action,
  getUsers: action,
  getProfiles: action,
  getInstitutionUsers: action,
  getAccounts: action,
  getTransactions: action,
  getInstitutions: action,
  createUser: action,
  createProfile: action,
  createInstitutionUser: action,
  createAccount: action,
  createTransaction: action,
  clearItemsOnScreenChange: action,
  selectUser: action,
  selectProfile: action,
  selectInstitutionUser: action,
  selectAccount: action,
  removeUser: action,
  removeProfile: action,
  removeInstitutionUser: action,
  removeAccount: action,
  clearProfiles: action,
  clearInstitutionUsers: action,
  clearTransactions: action,
  clearProfiles: action,
  clearError: action,
  setError: action,
  users: computed,
  profiles: computed,
  connections: computed,
  accounts: computed,
  transactions: computed,
  dots: computed,
  markerSubtitles: computed,
});

export default FlowStore;