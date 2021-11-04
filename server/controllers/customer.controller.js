import HandyStorage from 'handy-storage'
// import request from 'request'
import { loyversConnect, sendLineNotify } from '../help'

const storage = new HandyStorage({
  beautify: true,
})

// import { LOYVERSE_BASE_URL, LOYVERSE_TOKEN } from './../constant'
export const allCustomer = async (req, res, next) => {
  try {
    const result = await loyversConnect('GET', '/customers')
    res.json(result)
    // await sendLineNotify('hello world')
    // res.json({ message: 'ok' })
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
    const adviser = await findAdviserByAdviseCode(req.body.advise)
    // console.log(adviser)
    const msg = `มีสมาชิกใหม่
    คุณ : ${result.name}
    เบอร์ : ${result.phone_number}
    อีเมล : ${result.email}
    รู้จักเราจาก : ${req.body.know}
    รหัสแนะนำ : ${req.body.advise ? req.body.advise : '...'}
    ชื่อผู้แนะนำ : ${req.body.advise ? adviser.full_name : '...'}`
    await sendLineNotify(msg, req.body.imgUrl)
    res.json(result)
    // res.json({ message: 'ok' })
  } catch (e) {
    next(e)
  }
}

const findAdviserByAdviseCode = (adviseCode) => {
  return new Promise((resolve, reject) => {
    const connect = storage.connect('./server/userAffiliate.json')
    const { adviser } = connect.state
    const result = adviser.find((a) => a.advise_code === adviseCode)
    resolve(result)
  })
}
