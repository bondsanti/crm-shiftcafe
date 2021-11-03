import HandyStorage from 'handy-storage'
import { loyversConnect } from '../help'

const storage = new HandyStorage({
  beautify: true,
})

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
    const data = storage.connect('./server/referralcodeCutomerLoyverse.json')
    const result = await loyversConnect('POST', '/customers', req.body)
    const { customers } = data.state
    const newCustomer = {
      id_cutomer: result.id,
      know: req.body.know,
      advise: req.body.advise,
    }
    customers.push(newCustomer)
    data.setState({ customers })
    res.json(result)
  } catch (e) {
    next(e)
  }
}
