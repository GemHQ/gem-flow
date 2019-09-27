const httpGet = async (path) => {
  const baseUrl = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
  const response = await fetch(`${baseUrl}${path}`)
  const result = await response.json();

  return result;
}

export { httpGet }
