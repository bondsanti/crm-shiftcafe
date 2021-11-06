import { loyversConnect } from '../help'
export const getAllReceipt = async (req, res, next) => {
  try {
    let test = []
    let result = await loyversConnect('GET', '/receipts?limit=250')
    test = [...test, ...result.receipts]
    // ลูปจนกว่าไม่มีหน้าถัดไป
    while (result.cursor) {
      result = await checkCursorInResult(
        `/receipts?limit=250&cursor=${result.cursor}`
      )
      test = [...test, ...result.receipts]
    }
    res.json(test)
  } catch (e) {
    next(e)
  }
}

const checkCursorInResult = async (url) => {
  const result = await loyversConnect('GET', url)
  return result
}
