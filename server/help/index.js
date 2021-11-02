import fetch from 'node-fetch'
import { LOYVERSE_BASE_URL, LOYVERSE_TOKEN } from './../constant'
export const loyversConnect = (type, endpoint, body) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const url = LOYVERSE_BASE_URL + endpoint
      const options = {
        method: type,
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${LOYVERSE_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
      const response = await fetch(url, options)
      const json = await response.json()
      if (json.errors) {
        const { code, details, field } = json.errors[0]
        reject(new Error(`${code || ''} ${details || ''} ${field || ''}`))
      }
      resolve(json)
    } catch (e) {
      reject(e)
    }
  })
}

export const fetchProvince = (url) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // const url =
      //       'https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces'
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
      const response = await fetch(url, options)
      const json = await response.json()
      resolve(json)
    } catch (e) {
      reject(e)
    }
  })
}
