// import fetch from 'node-fetch'

import { loyversConnect } from '../help'

// import { LOYVERSE_BASE_URL, LOYVERSE_TOKEN } from './../constant'
export const allCustomer = async (req, res, next) => {
  try {
    const result = await loyversConnect('GET', '/customers')
    res.json(result)
  } catch (e) {
    next(e)
  }
}

export const createCustomer = async (req, res, next) => {
  try {
    const result = await loyversConnect('POST', '/customers', req.body)
    res.json(result)
  } catch (e) {
    next(e)
  }
}
