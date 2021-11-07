import HandyStorage from 'handy-storage'

import { loyversConnect, sendLineNotify } from '../help'

const storage = new HandyStorage({
  beautify: true,
})

export const allCustomer = async (req, res, next) => {
  try {
    let customers = []
    let result = await loyversConnect('GET', '/customers?limit=250')
    customers = [...customers, ...result.customers]

    while (result.cursor) {
      result = await checkCursorInResult(
        `/customers?limit=250&cursor=${result.cursor}`
      )
      customers = [...customers, ...result.customers]
    }

    const result2 = customers.map((r) => {
      return {
        id: r.id,
        name: r.name,
        email: result.email,
        phone_number: r.phone_number,
        total_spent: r.total_spent,
        total_points: r.total_points,
        customer_code: r.customer_code,
      }
    })

    res.json(result2)
  } catch (e) {
    next(e)
  }
}

export const allCustomerForAdmin = async (req, res, next) => {
  try {
    let customers = []
    let result = await loyversConnect('GET', '/customers?limit=250')
    customers = [...customers, ...result.customers]

    while (result.cursor) {
      result = await checkCursorInResult(
        `/customers?limit=250&cursor=${result.cursor}`
      )
      customers = [...customers, ...result.customers]
    }

    const result2 = result.customers.map((r) => {
      const customer = findCustomerById(r.id)
      return { ...r, detail: customer }
    })
    res.json(result2)
  } catch (e) {
    next(e)
  }
}

const checkCursorInResult = async (url) => {
  const result = await loyversConnect('GET', url)
  return result
}

const findCustomerById = (id) => {
  const data = storage.connect('./server/referralcodeCutomerLoyverse.json')
  const { customers } = data.state
  const result = customers.find((c) => c.id_cutomer === id)
  return result
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
    await data.save()

    const number = customers.length
    // console.log(number)
    const adviser = await findAdviserByAdviseCode(req.body.advise)
    const msg = `มีสมาชิกใหม่ [${number}]  \r
    คุณ : ${result.name} \r
    เบอร์ : ${result.phone_number}\r
    อีเมล : ${result.email}\r
    รู้จักเราจาก : ${req.body.know}\r
    รหัสแนะนำ : ${req.body.advise ? req.body.advise : '...'}\r
    ชื่อผู้แนะนำ : ${req.body.advise ? adviser.full_name : '...'}`
    // console.log(msg)
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
// Employees
export const allEmployees = async (req, res, next) => {
  try {
    const result = await loyversConnect('GET', '/employees?limit=250')
    res.json(result.employees)
  } catch (e) {
    next(e)
  }
}
