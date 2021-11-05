import { loyversConnect } from '../help'
export const getAllReceipt = async (req, res, next) => {
  try {
    const result = await loyversConnect('GET', '/receipts')
    res.json(result)
  } catch (e) {
    next(e)
  }
}
