import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import {
  ScreenNames,
  Endpoints,
  InstitutionIcons,
  InstitutionIds,
} from './Constants';
import { httpGet, httpPost, httpDelete } from '../util/RequestUtil';
import {
  formatProfileRequestBody,
  formatInstitutionUserRequestBody,
  formatConnectionRequest,
} from '../util/RequestFormatter';
import {
  deletePersistedUser,
  getPersistedConnectionsForUser,
  getPersistedUsers,
  persistConnection,
  persistNewUser,
} from '../util/PersistUtil';
import { SERVER_URL, setupClient } from '../util/ClientUtil';

class DataStore {
  // store items from Gem API in maps with persistance
  @persist('map') @observable usersMap = new Map();
  @persist('map') @observable profilesMap = new Map();
  @persist('map') @observable institutionUsersMap = new Map();
  @persist('map') @observable connectionsMap = new Map();
  @persist('map') @observable accountsMap = new Map();
  @persist('map') @observable transactionsMap = new Map();
  @persist('map') @observable institutionMap = new Map();

  // store items selected by user
  @persist('object') @observable selectedUser = null;
  @persist('object') @observable selectedProfile = null;
  @persist('object') @observable selectedInstitutionUser = null;
  @persist('object') @observable selectedConnection = null;
  @persist('object') @observable selectedAccount = null;

  // variables for ui messaging
  @observable isFetching = false;
  @observable isPosting = false;
  @observable errorMessage = '';

  client;

  constructor() {
    this.getUsers();
    // this.getInstitutions();
    this.initClient();
  }

  @action initClient = async () => {
    this.client = await setupClient();
  };

  // All GET requests to the local node server
  @action getItems = async (path, itemMap) => {
    this.isFetching = true;
    const { data, status } = await httpGet(path);
    this.isFetching = false;
    if (status >= 400) {
      return this.setError(data.description);
    }
    itemMap.clear();
    data.forEach((item) => itemMap.set(item.id, item));
  };
  @action getUsers = async () => {
    const users = getPersistedUsers();
    users.forEach((user) => this.usersMap.set(user.id, user));
    // return await this.getItems(Endpoints.USER, this.usersMap);
  };
  @action getProfiles = async () => {
    return await this.getItems(
      `${Endpoints.PROFILE}/${this.selectedUser.userName}`,
      this.profilesMap
    );
  };
  @action getInstitutionUsers = async () => {
    return this.getItems(
      `${Endpoints.INSTITUTION_USER}${Endpoints.PROFILE}/${this.selectedProfile.id}`,
      this.institutionUsersMap
    );
  };
  @action getConnections = async () => {
    if (!this.selectedUser) return;
    const connections = getPersistedConnectionsForUser(
      this.selectedUser.userName
    );
    connections.forEach((connection) =>
      this.connectionsMap.set(connection.id, connection)
    );
    // return this.getItems(
    //   `${Endpoints.CONNECTIONS}/${this.selectedUser.userName}`,
    //   this.connectionsMap
    // );
  };
  @action getAccounts = async (connectionId) => {
    return await this.getItems(
      `${Endpoints.ACCOUNT}/list/${connectionId}`,
      this.accountsMap
    );
  };
  @action getTransactions = async () => {
    return await this.getItems(
      `${Endpoints.TRANSACTION}/list/${this.selectedAccount.id}`,
      this.transactionsMap
    );
  };
  @action getInstitutions = async () => {
    const { data, status } = await httpGet(Endpoints.INSTITUTION);
    if (status >= 400) return;
    data.forEach((institution) =>
      this.institutionMap.set(institution.id, {
        ...institution,
        icon: InstitutionIcons[institution.id],
      })
    );
  };

  // All POST requests to the local node server
  @action createItem = async (path, body, itemMap, defaultError) => {
    this.isPosting = true;
    const { data, status } = await httpPost(path, body);
    this.isPosting = false;
    if (status >= 400) return this.setError(data.description || defaultError);
    console.log(path, data);
    itemMap && itemMap.set(data.id, data);
    return data;
  };
  @action createUser = async ({ password }) => {
    const { body } = await this.client.apis.Users.post_users(null, {
      requestBody: { password },
      server: SERVER_URL,
    });
    const user = { ...body.data, password };
    console.log(user);
    this.usersMap.set(user.userName, user);
    persistNewUser(user);
  };
  @action createProfile = async (profileFormData) => {
    this.isPosting = true;
    const profile = formatProfileRequestBody(profileFormData);
    const userId = this.selectedUser.userName;
    const { data, status } = await httpPost(Endpoints.PROFILE, {
      userId,
      profile,
    });
    this.isPosting = false;
    if (status >= 400) return this.setError(data.description);
    this.profilesMap.set(data.id, data);
    await httpPost(Endpoints.PROFILE_DOCUMENT, {
      profileId: data.id,
      document: profileFormData.document,
    });
  };
  @action createInstitutionUser = async (institutionUserFormData) => {
    const institutionUser = formatInstitutionUserRequestBody(
      this.selectedProfile.id,
      institutionUserFormData
    );
    this.createItem(
      Endpoints.INSTITUTION_USER,
      institutionUser,
      this.institutionUsersMap
    );
  };
  @action createConnection = async (connection) => {
    if (!this.selectedUser) return;
    this.connectionsMap.set(connection.id, connection);
    persistConnection(this.selectedUser.userName, connection);
    // const connectionBody = formatConnectionRequest({
    //   credentialId,
    //   userId: this.selectedUser.userName,
    // });
    // this.createItem(Endpoints.CONNECTIONS, connectionBody, this.connectionsMap);
  };
  @action createAccount = async (account) => {
    this.createItem(Endpoints.ACCOUNT, account, this.accountsMap);
  };
  @action createTransaction = async (transaction) => {
    this.createItem(Endpoints.TRANSACTION, transaction, this.transactionsMap);
  };

  // item selector methods with flow store cleanup management
  @action selectUser = (id, nextScreen) => {
    this.selectedUser = this.usersMap.get(id);
    this.clearProfiles();
    this.clearInstitutionUsers();
    this.clearConnections();
    this.clearAccounts();
    if (nextScreen === ScreenNames.PROFILE) this.getProfiles();
    if (nextScreen === ScreenNames.CONNECTION) this.getConnections();
  };
  @action selectProfile = (id) => {
    if (this.selectedProfile && id === this.selectedProfile.id) return;
    this.selectedProfile = this.profilesMap.get(id);
    this.clearInstitutionUsers();
    this.clearConnections();
    this.clearAccounts();
    this.getInstitutionUsers();
  };
  @action selectInstitutionUser = (id) => {
    if (this.selectedInstitutionUser && id === this.selectedInstitutionUser.id)
      return;
    this.selectedInstitutionUser = this.institutionUsersMap.get(id);
    this.clearAccounts();
    this.getAccounts(this.selectedInstitutionUser.connection_id);
  };
  @action selectConnection = (id) => {
    if (this.selectedConnection && id === this.selectedConnection.id) return;
    this.selectedConnection = this.connectionsMap.get(id);
    this.clearAccounts();
    this.getAccounts(id);
  };
  @action selectAccount = (id) => {
    if (this.selectedAccount && id === this.selectedAccount.id) return;
    this.selectedAccount = this.accountsMap.get(id);
    this.clearTransactions();
    this.getTransactions();
  };

  // All DELETE requests to the local node server, * not yet supported Gem API endpoints
  @action removeUser = (id) => {
    this.usersMap.delete(id);
    deletePersistedUser(id);
    // httpDelete(`${Endpoints.USER}/${id}`);
  };
  @action removeProfile = (id) => {
    this.profilesMap.delete(id);
    httpDelete(`${Endpoints.PROFILE}/${id}`);
  };
  @action removeInstitutionUser = (id) => {
    this.institutionUsersMap.delete(id);
  };
  @action removeAccount = (id) => {
    this.accountsMap.delete(id);
  };

  // flow store cleanup methods
  @action clearProfiles = () => {
    this.selectedProfile = null;
    this.profilesMap.clear();
  };
  @action clearInstitutionUsers = () => {
    this.selectedInstitutionUser = null;
    this.institutionUsersMap.clear();
  };
  @action clearConnections = () => {
    this.selectedConnection = null;
    this.connectionsMap.clear();
  };
  @action clearAccounts = () => {
    this.selectedAccount = null;
    this.accountsMap.clear();
    this.clearTransactions();
  };
  @action clearTransactions = () => {
    this.transactionsMap.clear();
  };
  @action clearItemsOnScreenChange = (screenName) => {
    switch (screenName) {
      case ScreenNames.USER:
        this.selectedUser = null;
        this.clearProfiles();
        this.clearInstitutionUsers();
        this.clearConnections();
        this.clearAccounts();
        this.clearTransactions();
        break;
      case ScreenNames.PROFILE:
        this.selectedProfile = null;
        this.selectedConnection = null;
        this.clearInstitutionUsers();
        this.clearConnections();
        this.clearAccounts();
        this.clearTransactions();
        break;
      case ScreenNames.CONNECTION:
        this.selectedInstitutionUser = null;
        this.selectedConnection = null;
        this.clearAccounts();
        this.clearTransactions();
        break;
      case ScreenNames.ACCOUNT:
        this.selectedAccount = null;
        this.clearTransactions();
        break;
      default:
        return;
    }
  };

  // error messaging
  @action clearError = () => {
    this.errorMessage = '';
  };
  @action setError = (errorMessage) => {
    // errorMessage may be null, hence default value in the params (message = 'Unknown Error') will not work
    this.errorMessage = errorMessage || 'Unknown Error';
  };

  // turn item maps into arrays for components to read
  // only supply these arrays to components, not the maps
  @computed get users() {
    return [...this.usersMap.values()].reverse();
  }
  @computed get profiles() {
    return [...this.profilesMap.values()].reverse();
  }
  @computed get institutionUsers() {
    return [...this.institutionUsersMap.values()].reverse();
  }
  @computed get institutions() {
    // NOTE: Institutions are pre-sorted by API rank.
    return [...this.institutionMap.values()];
  }
  @computed get exchangeInstitutions() {
    return [...this.institutionMap.values()].filter(
      (i) => i.institution_type === 'Exchange'
    );
  }
  @computed get fiatInstitutions() {
    // NOTE: Institutions are pre-sorted by API rank.
    return [...this.institutionMap.values()].filter(
      (i) => i.institution_type === 'FiatOnRamp'
    );
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
  // TODO: compute institutions array
}

export default DataStore;
