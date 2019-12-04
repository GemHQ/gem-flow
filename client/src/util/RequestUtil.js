import { Endpoints } from "../stores/Constants";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;

// const GEM_API_URL = 'https://vgs-dev.gem.farm';
const GEM_API_URL = 'https://vgs-sandbox.gem.co';
const BASE_URL =  `http://${SERVER_HOST}:${SERVER_PORT}`;
const sharedRequestOptions = {
  mode: 'cors',
  cache: 'no-cache',
  headers: {'Content-Type': 'application/json'},
}

export const httpGet = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`);
  const data = await response.json();
  return { data, status: response.status };
}

export const httpPost = async (path, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...sharedRequestOptions,
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return { data, status: response.status };
}

export const httpDelete = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...sharedRequestOptions,
    method: 'DELETE',
  });
  const data = await response.json();
  return { data, status: response.status };
}

export const postCredentials = async credentials => {
  const response = await fetch(`${GEM_API_URL}${Endpoints.CREDENTIALS}`, {
    ...sharedRequestOptions,
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      ...sharedRequestOptions.headers,
      'X-Gem-Api-Key': process.env.REACT_APP_GEM_API_KEY
    }
  });
  const data = await response.json();
  return { data, status: response.status };
}