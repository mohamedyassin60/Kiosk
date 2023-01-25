import axios from 'axios'

const instance = async (method, url, extras) => {
  let fUrl = `http://localhost:3001/${url}`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  if (!!extras?.params) {
    fUrl += `?${new URLSearchParams(extras.params).toString()}`
  }

  const config = {
    headers,
    timeout: 30000
  }

  let response
  if (method === 'GET') {
    response = await axios.get(fUrl, config)
  } else if (method === 'POST') {
    response = await axios.post(fUrl, JSON.stringify(extras.body), config)
  } else if (method === 'PUT') {
    response = await axios.put(fUrl, JSON.stringify(extras.body), config)
  } else if (method === 'DELETE') {
    response = await axios.delete(fUrl, config)
  }
  console.log('Request', url, response.data)
  return response.data
}

const get = async (url, extras = {}) => {
  return await instance('GET', url, extras)
}

const post = async (url, extras = {}) => {
  return await instance('POST', url, extras)
}

const put = async (url, extras = {}) => {
  return await instance('PUT', url, extras)
}

const dlt = async (url, extras = {}) => {
  return await instance('DELETE', url, extras)
}

export { get, post, put, dlt }
