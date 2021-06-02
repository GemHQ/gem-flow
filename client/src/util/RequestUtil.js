import { 
  REACT_APP_GEM_CLIENT_BASE_URL,
  REACT_APP_GEM_API_KEY,
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PORT
} from '../constants/Env';
import { Endpoints } from "../stores/Constants";

const BASE_URL =  `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`;
const sharedRequestOptions = {
  mode: 'cors',
  cache: 'no-cache',
  headers: {'Content-Type': 'application/json'},
}

export const httpGet = async (path) => {
  return { data: [], status: 200 };
  const response = await fetch(`${BASE_URL}${path}`);
  const data = await response.json();
  return { data, status: response.status };
}

export const httpPost = async (path, body) => {
  return { data: [], status: 200 };
  const response = await fetch(`${BASE_URL}${path}`, {
    ...sharedRequestOptions,
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return { data, status: response.status };
}

export const httpDelete = async (path) => {
  return { data: [], status: 200 };
  const response = await fetch(`${BASE_URL}${path}`, {
    ...sharedRequestOptions,
    method: 'DELETE',
  });
  const data = await response.json();
  return { data, status: response.status };
}