import HandyStorage from 'handy-storage'
import { findValueById, randomId } from '../help'
const storage = new HandyStorage({
  beautify: true,
})
export const allAdviser = (req, res, next) => {
  try {
    const connect = storage.connect('./server/userAffiliate.json')
    res.json(connect.state.adviser)
  } catch (e) {
    next(e)
  }
}

export const createAdviser = async (req, res, next) => {
  try {
    const connect = storage.connect('./server/userAffiliate.json')
    const { adviser } = connect.state
    const { adviseCode, fullName, idCustomer, status } = req.body
    const obj = {
      id: await randomId(),
      advise_code: adviseCode,
      full_name: fullName,
      id_customer: idCustomer,
      percent: 0,
      status,
    }
    adviser.push(obj)
    connect.setState({ adviser })
    connect.save()
    res.json(obj)
  } catch (e) {
    next(e)
  }
}
export const updateAdviser = async (req, res, next) => {
  try {
    const connect = storage.connect('./server/userAffiliate.json')
    const { adviser } = connect.state
    const { id, adviseCode, fullName, idCustomer, status, percent } = req.body
    const index = await findValueById(adviser, id)
    adviser[index].advise_code = adviseCode
    adviser[index].full_name = fullName
    adviser[index].id_customer = idCustomer
    adviser[index].status = status
    adviser[index].percent = percent
    connect.setState({ adviser })
    connect.save()
    res.json(adviser[index])
  } catch (e) {
    next(e)
  }
}

export const deleteAdviser = async (req, res, next) => {
  try {
    const connect = storage.connect('./server/userAffiliate.json')
    const { adviser } = connect.state
    const { id } = req.params
    const index = await findValueById(adviser, id)
    adviser.splice(index, 1)
    connect.setState({ adviser })
    connect.save()
    res.json(adviser)
  } catch (e) {
    next(e)
  }
}
