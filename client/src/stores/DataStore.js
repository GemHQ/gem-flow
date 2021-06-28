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
import {
  CoinbaseOAuthParams,
  SERVER_URL,
  setupClient,
} from '../util/ClientUtil';

class DataStore {
  // store items from Gem API in maps with persistance
  @persist('map') @observable usersMap = new Map();
  @persist('map') @observable profilesMap = new Map();
  @persist('map') @observable institutionUsersMap = new Map();
  @persist('map') @observable connectionsMap = new Map();
  @persist('map') @observable accountsMap = new Map();
  @persist('map') @observable transactionsMap = new Map();
  @persist('map') @observable institutionMap = new Map();
  @persist('map') @observable credentialMap = new Map();

  // store items selected by user
  @persist('object') @observable selectedUser = null;
  @persist('object') @observable selectedProfile = null;
  @persist('object') @observable selectedInstitutionUser = null;
  @persist('object') @observable selectedConnection = null;
  @persist('object') @observable selectedAccount = null;
  @persist('object') @observable selectedCredential = null;

  // variables for ui messaging
  @observable isFetching = false;
  @observable isPosting = false;
  @observable errorMessage = '';
  client;

  constructor() {
    this.init();
  }

  @action init = async () => {
    this.client = await setupClient();
    this.getUsers();
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
    this.usersMap = new Map();
    users.forEach((user) => this.usersMap.set(user.userName, user));
    setTimeout(() => {
      if (this.selectedUser) {
        this.client.authorizations.BasicAuth = {
          username: this.selectedUser.userName,
          password: this.selectedUser.password,
        };
      }
      console.log(this.client);
    }, 100);
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
    connections.forEach((connection) =>
      this.connectionsMap.set(connection.id, connection)
    );
  };
  @action getAccounts = async () => {
    try {
      if (!this.client) return;
      this.accountsMap.clear();
      const response = await this.client.apis.Accounts.get_accounts(null, {
        server: SERVER_URL,
        parameters: { proxyToken: this.selectedCredential.proxyToken },
      });
      const accounts = response.body.data;
      accounts.forEach((account) =>
        this.accountsMap.set(account.accountId, account)
      );
      return response;
    } catch (e) {
      this.setError('Failed to fetch accounts.');
      console.error(e);
    }
  };
  @action getTransactions = async () => {
    try {
      if (!this.client) return;
      this.transactionsMap.clear();
      const response = await this.client.apis.Transactions.get_transactions(
        null,
        {
          server: SERVER_URL,
          parameters: {
            proxyToken: this.selectedCredential.proxyToken,
            accountId: this.selectedAccount.accountId,
          },
        }
      );
      response.body.data.forEach((trx) =>
        this.transactionsMap.set(trx.transactionId, trx)
      );
    } catch (e) {
      this.setError('Failed to fetch transaction history.');
      console.error(e);
    }
  };
  @action getInstitutions = async () => {
    try {
      const response = await this.client.apis.Exchanges.get_exchanges(null, {
        server: SERVER_URL,
      });
      return response;
    } catch (e) {
      this.setError('Failed to fetch exchanges list.');
      console.error(e);
      throw e;
    }
  };
  getCoinbaseAuthorizationURI = async () => {
    try {
      const response = await this.client.apis.Exchanges.get_authorization_uri(
        null,
        {
          parameters: CoinbaseOAuthParams,
          server: SERVER_URL,
        }
      );
      return response;
    } catch (e) {
      this.setError('Failed to fetch Coinbase Authorization URI.');
      console.error(e);
      throw e;
    }
  };
  getSdkUri = async ({ exchangeId }) => {
    try {
      const response = await this.client.apis.Users.get_users_sdk_uri(null, {
        parameters: { exchangeId },
        server: SERVER_URL,
      });
      return response;
    } catch (e) {
      this.setError('Failed to fetch SDK token.');
      console.error(e);
      throw e;
    }
  };
  @action getCredentials = async () => {
    try {
      this.credentialMap.clear();
      const response = await this.client.apis.Credentials.get_credentials(
        null,
        {
          server: SERVER_URL,
        }
      );
      response.body.data.forEach((credential) =>
        this.credentialMap.set(credential.proxyToken, credential)
      );
    } catch (e) {
      this.setError('Failed to fetch credentails.');
      throw e;
    }
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
    try {
      const { body } = await this.client.apis.Users.post_users(null, {
        requestBody: { password },
        server: SERVER_URL,
      });
      const user = { ...body.data, password };
      console.log(user);
      this.usersMap.set(user.userName, user);
      persistNewUser(user);
    } catch (e) {
      this.setError('Failed to create user. Try a longer password.');
      throw e;
    }
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
  };
  @action createAccount = async (account) => {
    this.createItem(Endpoints.ACCOUNT, account, this.accountsMap);
  };
  @action createTransaction = async (transaction) => {
    this.createItem(Endpoints.TRANSACTION, transaction, this.transactionsMap);
  };
  @action createCredentialWithOAuthCode = async (code) => {
    try {
      const { body } = await this.client.apis['OAuth Proxy'].get_pa_tokens(
        null,
        {
          parameters: {
            response_token: code,
            provider_id: 'coinbase',
            intuit_property: 'turbotax',
            initial_redirect_uri: CoinbaseOAuthParams.offering_redirect_uri,
          },
          server: SERVER_URL,
        }
      );
      console.log('coinbase credential', body.data);
    } catch (e) {
      console.error(e);
    }
  };

  // item selector methods with flow store cleanup management
  @action selectUser = (userName) => {
    const user = this.usersMap.get(userName);
    this.selectedUser = user;
    this.clearConnections();
    this.clearAccounts();
    this.client.authorizations.BasicAuth = {
      username: userName,
      password: user.password,
    };
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
    if (!id) this.selectedAccount = null;
    if (this.selectedAccount && id === this.selectedAccount.id) return;
    this.selectedAccount = this.accountsMap.get(id);
    this.clearTransactions();
  };
  @action selectCredential = (credential) => {
    this.selectedCredential = credential;
  };

  // All DELETE requests to the local node server, * not yet supported Gem API endpoints
  @action removeUser = (id) => {
    this.usersMap.delete(id);
    deletePersistedUser(id);
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
  @action clearCredentials = () => {
    this.selectedCredential = null;
    this.credentialMap.clear();
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
        this.clearCredentials();
        this.clearAccounts();
        this.clearTransactions();
        this.client.authorizations.BasicAuth = {
          username: process.env.REACT_APP_DEMO_APP_USERNAME,
          password: process.env.REACT_APP_DEMO_APP_PASSWORD,
        };
        break;
      case ScreenNames.PROFILE:
        this.selectedProfile = null;
        this.selectedConnection = null;
        this.clearInstitutionUsers();
        this.clearCredentials();
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
    console.log('set error:', errorMessage);
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
  @computed get credentials() {
    return [...this.credentialMap.values()].reverse();
  }
  // TODO: compute institutions array
}

export default DataStore;
