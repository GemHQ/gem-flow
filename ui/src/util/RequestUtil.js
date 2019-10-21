const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;

const BASE_URL =  `http://${SERVER_HOST}:${SERVER_PORT}`;

export const httpGet = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`)
  const data = await response.json();
  const status = response.status
  return { data, status };
}

export const httpPost = async (path, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  const status = response.status
  return { data, status };
}

export const httpDelete = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  const status = response.status
  return { data, status };
}
