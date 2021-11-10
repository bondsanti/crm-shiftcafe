import fetch from 'node-fetch'
import request from 'request'
import { v4 as uuidV4 } from 'uuid'
import bcrypt from 'bcrypt'
import {
  LINENOTIFY_TOKEN,
  LOYVERSE_BASE_URL,
  LOYVERSE_TOKEN,
} from './../constant'
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

export const sendLineNotify = (msg, imgUrl) => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        header: {
          'Content-Type': 'multipart/form-data',
        },
        auth: {
          bearer: LINENOTIFY_TOKEN,
        },
        form: {
          message: msg,
          imageThumbnail: imgUrl,
          imageFullsize: imgUrl,
        },
      },
      (err, httpResponse, body) => {
        if (err) {
          // console.log(err)
          reject(err)
        } else {
          // console.log(body)
          reject(body)
        }
      }
    )
    resolve(true)
  })
}

export const encodePassword = (password) => {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('123456', salt)
    resolve(hash)
  })
}

export const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    const result = bcrypt.compareSync(password, hash)
    resolve(result)
  })
}

export const randomId = () => {
  return new Promise((resolve, reject) => {
    const result = uuidV4()
    resolve(result)
  })
}
