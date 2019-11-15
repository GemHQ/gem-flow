import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";
import { ScreenNames, Endpoints, InstitutionIcons } from "./Constants";
import { httpGet, httpPost, httpDelete } from '../util/RequestUtil';
import { 
  formatProfileRequestBody,
  formatInstitutionUserRequestBody,
  formatCoinbaseConnectionRequest,
} from "../util/RequestFormatter";

class FlowStore {
  @persist('map') @observable usersMap = new Map();
  @persist('map') @observable profilesMap = new Map();
  @persist('map') @observable institutionUsersMap = new Map();
  @persist('map') @observable connectionsMap = new Map();
  @persist('map') @observable accountsMap = new Map();
  @persist('map') @observable transactionsMap = new Map();
  @persist('map') @observable institutionMap = new Map();

  @persist('object') @observable selectedUser = null;
  @persist('object') @observable selectedProfile = null;
  @persist('object') @observable selectedInstitutionUser = null;
  @persist('object') @observable selectedAccount = null;

  @observable isFetching = false;
  @observable isPosting = false;
  @observable errorMessage = '';

  constructor() {
    this.getUsers();
  }

  @action getItems = async (path, itemMap) => {
    this.isFetching = true;
    const { data, status } = await httpGet(path);
    this.isFetching = false;
    if (status >= 400) {
      return this.setError(data.description);
    }
    console.log(path, data);
    itemMap.clear();
    data.forEach(item => itemMap.set(item.id, item));
  }
  @action getUsers = async () => {
    return await this.getItems(Endpoints.USER, this.usersMap);
  }
  @action getProfiles = async () => {
    return await this.getItems(`${Endpoints.PROFILE}/${this.selectedUser.id}`, this.profilesMap);
  }
  @action getInstitutionUsers = async () => {
    return this.getItems(`${Endpoints.INSTITUTION_USER}${Endpoints.PROFILE}/${this.selectedProfile.id}`, this.institutionUsersMap);
  }
  @action getConnections = async () => {
    return this.getItems(`${Endpoints.CONNECTIONS}/${this.selectedUser.id}`, this.connectionsMap);
  }
  @action getAccounts = async connectionId => {
    return await this.getItems(`${Endpoints.ACCOUNT}/list/${connectionId}`, this.accountsMap);
  }
  @action getTransactions = async () => {
    return await this.getItems(`${Endpoints.TRANSACTION}/list/${this.selectedAccount.id}`, this.transactionsMap);
  }
  @action getInstitutions = async () => {
    const { data, status } = await httpGet(Endpoints.INSTITUTION);
    if (status >= 400) return;
    data.forEach(institution => this.institutionMap.set(institution.id, {
      ...institution, 
      icon: InstitutionIcons[institution.id]
    }));
  }

  @action createItem = async (path, body, itemMap, defaultError) => {
    this.isPosting = true;
    const { data, status } = await httpPost(path, body);
    this.isPosting = false;
    if (status >= 400) return this.setError(data.description || defaultError);
    itemMap.set(data.id, data);
  }
  @action createUser = async user => {
    this.createItem(Endpoints.USER, { user }, this.usersMap);
  }
  @action createProfile = async profileFormData => {
    this.isPosting = true;
    const profile = formatProfileRequestBody(profileFormData);
    const userId = this.selectedUser.id;
    const { data, status } = await httpPost(Endpoints.PROFILE, { userId, profile });
    this.isPosting = false;
    if (status >= 400) return this.setError(data.description);
    this.profilesMap.set(data.id, data);
    await httpPost(Endpoints.PROFILE_DOCUMENT, { profileId: data.id, document: profileFormData.document });
  }
  @action createInstitutionUser = async institutionUserFormData => {
    const institutionUser = formatInstitutionUserRequestBody(this.selectedProfile.id, institutionUserFormData);
    this.createItem(Endpoints.INSTITUTION_USER, institutionUser, this.institutionUsersMap);
  }
  @action createConnection = async oauthCode => {
    if (!this.selectedUser) return;
    const connectionBody = formatCoinbaseConnectionRequest({ oauthCode, userId: this.selectedUser.id });
    this.createItem(Endpoints.CONNECTIONS, connectionBody, this.connectionsMap);
  }
  @action createAccount = async account => {
    this.createItem(Endpoints.ACCOUNT, account, this.accountsMap);
  }
  @action createTransaction = async transaction => {
    this.createItem(Endpoints.TRANSACTION, transaction, this.transactionsMap);
  }

  @action selectUser = (id, nextScreen) => {
    this.selectedUser = this.usersMap.get(id);
    this.clearProfiles();
    this.clearInstitutionUsers();
    this.clearAccounts();
    if (nextScreen === ScreenNames.PROFILE) this.getProfiles();
    if (nextScreen === ScreenNames.CONNECTION) this.getConnections();
  }
  @action selectProfile = id => {
    if (this.selectedProfile && id === this.selectedProfile.id) return;
    this.selectedProfile = this.profilesMap.get(id);
    this.clearInstitutionUsers();
    this.clearAccounts();
    this.getInstitutionUsers();
  }
  @action selectInstitutionUser = id => {
    if (this.selectedInstitutionUser && id === this.selectedInstitutionUser.id) return;
    this.selectedInstitutionUser = this.institutionUsersMap.get(id);
    this.clearAccounts();
    this.getAccounts(this.selectedInstitutionUser.connection_id);
  }
  @action selectConnection = id => {
    if (this.selectedConnection && id === this.selectedConnection.id) return;
    this.selectedConnection = this.connectionsMap.get(id);
    this.clearAccounts();
    this.getAccounts(id);
  }
  @action selectAccount = id => {
    if (this.selectedAccount && id === this.selectedAccount.id) return;
    this.selectedAccount = this.accountsMap.get(id);
    this.clearTransactions();
    this.getTransactions();
  }

  @action removeUser = id => {
    this.usersMap.delete(id);
    httpDelete(`${Endpoints.USER}/${id}`);
  }
  @action removeProfile = id => {
    this.profilesMap.delete(id);
    httpDelete(`${Endpoints.PROFILE}/${id}`);
  }
  @action removeInstitutionUser = id => {
    this.institutionUsersMap.delete(id);
  }
  @action removeAccount = id => {
    this.accountsMap.delete(id);
  }

  @action clearProfiles = () => {
    this.selectedProfile = null;
    this.profilesMap.clear();
  }
  @action clearInstitutionUsers = () => {
    this.selectedInstitutionUser = null;
    this.institutionUsersMap.clear();
  }
  @action clearAccounts = () => {
    this.selectedAccount = null;
    this.accountsMap.clear();
    this.clearTransactions();
  }
  @action clearTransactions = () => {
    this.transactionsMap.clear();
  }
  @action clearItemsOnScreenChange = screenName => {
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

  @action clearError = () => {
    this.errorMessage = '';
  }
  @action setError = errorMessage => {
    // errorMessage may be null, hence default value in the params (message = 'Unknown Error') will not work
    this.errorMessage = errorMessage || 'Unknown Error';
  }

  @computed get users() {
    return [...this.usersMap.values()].reverse();
  }
  @computed get profiles() {
    return [...this.profilesMap.values()].reverse();
  }
  @computed get institutionUsers() {
    return [...this.institutionUsersMap.values()].reverse();
  }
  @computed get connections() {
    return [...this.connectionsMap.values()].reverse();
  }
  @computed get accounts() {
    return [...this.accountsMap.values()].reverse();
  }
  @computed get transactions() {
    return [...this.transactionsMap.values()].reverse();
  }

  // which dots are filled in the progress map
  @computed get dots() {
    return [
      [ScreenNames.USER, Boolean(this.selectedUser)],
      [ScreenNames.PROFILE, Boolean(this.selectedProfile)],
      [ScreenNames.CONNECTION, Boolean(this.selectedInstitutionUser)],
      [ScreenNames.ACCOUNT, Boolean(this.selectedAccount)],
      [ScreenNames.TRANSACTION, Boolean(this.transactionsMap.size)],
    ]
  }

  // subtitles for the markers on the progress map
  @computed get markerSubtitles() {
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

export default FlowStore;