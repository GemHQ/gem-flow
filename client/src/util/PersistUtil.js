import { create } from 'mobx-persist';

const FLOW_ID_STORAGE_KEY = 'selected_flow_id';
const CURRENT_SCREEN_KEY = 'current_screen';
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
export const persistCurrentScreen = (currentScreen) => {
  try {
    localStorage.setItem(CURRENT_SCREEN_KEY, currentScreen);
  } catch (e) {
    console.error(e);
  }
};
export const persistNewUser = (user) => {
  try {
    console.log('persiting new user', user);
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    console.log('usersJson', usersJson);
    let users = usersJson ? JSON.parse(usersJson) : [];
    console.log('users', users);
    users = [...users, JSON.stringify(user)];
    console.log('users', users);
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
export const getPersistedScreen = () => {
  try {
    return localStorage.getItem(CURRENT_SCREEN_KEY);
  } catch (e) {
    console.error(e);
  }
};
export const getPersistedUsers = () => {
  try {
    console.log('getting users');
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    console.log('usersJson', usersJson);
    if (!usersJson) return [];
    let users = JSON.parse(usersJson);
    console.log('users', users);
    users = users.map((user) => JSON.parse(user));
    console.log('users', users);
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

export const deletePersistedUser = (userId) => {
  try {
    console.log('deleting user', userId);
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    console.log('usersJson', usersJson);
    if (!usersJson) throw new Error(`No user of ID ${userId}`);
    let users = JSON.parse(usersJson);
    console.log('users', users);
    users = users.filter((userJson) => {
      const user = JSON.parse(userJson);
      return user.id !== userId;
    });
    console.log('users', users);
    localStorage.setItem(USERS_STORAGE_KEY, users);
  } catch (e) {
    console.error(e);
  }
};

export const hydrateFlowStore = (dataStore) =>
  create({ storage: localStorage })(FLOW_STORE_KEY, dataStore);
