import { create } from 'mobx-persist';

const FLOW_ID_STORAGE_KEY = 'selected_flow_id';
const FLOW_STORE_KEY = 'flow_store';
const USERS_STORAGE_KEY = 'users';
const CONNECTIONS_STORAGE_KEY = 'connections';

export const persistSelectedFlowId = (flowId) => {
  try {
    localStorage.setItem(FLOW_ID_STORAGE_KEY, flowId);
  } catch (e) {
    console.error(e);
  }
};

export const persistNewUser = (user) => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    let users = usersJson ? JSON.parse(usersJson) : [];
    users = [...users, JSON.stringify(user)];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
};
export const persistConnection = (userId, connection) => {
  try {
    const connectionsJson = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
    const connections = connectionsJson
      ? JSON.parse(connectionsJson)
      : new Map();
    const userConnections = connections.getItem(userId) || [];
    connections.setItem(userId, [
      ...userConnections,
      JSON.stringify(connection),
    ]);
    localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(connections));
  } catch (e) {
    console.error(e);
  }
};

export const getPersistedFlowId = () => {
  try {
    return localStorage.getItem(FLOW_ID_STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
};

export const getPersistedUsers = () => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersJson) return [];
    let users = JSON.parse(usersJson);
    users = users.map((user) => JSON.parse(user));
    return users;
  } catch (e) {
    console.error(e);
  }
};
export const getPersistedConnectionsForUser = (userId) => {
  try {
    const connectionsJson = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
    if (!connectionsJson) return [];
    const allConnections = JSON.parse(connectionsJson);
    const userConnections = allConnections.getItem(userId);
    return userConnections || [];
  } catch (e) {
    console.error(e);
  }
};

export const deletePersistedUser = (userName) => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersJson) throw new Error(`No user of with username ${userName}`);
    let users = JSON.parse(usersJson);
    users = users.filter((userJson) => {
      const user = JSON.parse(userJson);
      return user.userName !== userName;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
};

export const hydrateFlowStore = (dataStore) =>
  create({ storage: localStorage })(FLOW_STORE_KEY, dataStore);
