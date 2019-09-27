const httpGet = async (path) => {
  const baseUrl = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
  const response = await fetch(`${baseUrl}${path}`)
  const result = await response.json();

  return result;
}

const httpPost = async (path, data) => {
  const baseUrl = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`

  console.log(JSON.stringify(data))


  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  const result = await response.json();

  return result;
}

export { httpGet, httpPost }
