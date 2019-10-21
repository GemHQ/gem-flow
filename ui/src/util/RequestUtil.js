const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;

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
