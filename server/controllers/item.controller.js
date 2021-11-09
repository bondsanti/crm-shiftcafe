import { loyversConnect } from '../help'

export const allItem = async (req, res, next) => {
  try {
    const result = await loyversConnect('GET', '/items?limit=250')
    res.json(result.items)
  } catch (e) {
    next(e)
  }
}

export const allCategory = async (req, res, next) => {
  try {
    const result = await loyversConnect('GET', '/categories?limit=250')
    res.json(result.categories)
  } catch (e) {
    next(e)
  }
}
