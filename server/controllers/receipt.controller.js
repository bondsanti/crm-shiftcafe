import { loyversConnect } from '../help'
export const getAllReceipt = async (req, res, next) => {
  try {
    // pos devices
    const posDevices = await loyversConnect('GET', '/pos_devices')
    // end
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
    // console.log(posDevices)
    const receipts = test.map((t) => {
      const obj = { ...t }
      obj.pos_device_id = findPosDevicesName(
        t.pos_device_id,
        posDevices.pos_devices
      )
      return obj
    })
    res.json(receipts)
  } catch (e) {
    next(e)
  }
}

const checkCursorInResult = async (url) => {
  const result = await loyversConnect('GET', url)
  return result
}

const findPosDevicesName = (id, posDevices) => {
  const res = posDevices.find((p) => p.id === id)
  return res.name
}
