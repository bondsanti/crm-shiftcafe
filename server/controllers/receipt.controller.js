import schedule from 'node-schedule'
import HandyStorage from 'handy-storage'
import { loyversConnect } from '../help'
const storage = new HandyStorage({
  beautify: true,
})
export const getAllReceipt = (req, res, next) => {
  try {
    // pos devices
    const connect = storage.connect('./server/receipts.json')
    res.json(connect.state.receipts)
  } catch (e) {
    next(e)
  }
}

export const getAllReceiptFormLoyverseServer = async (req, res, next) => {
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
    setReceipt(receipts)
    res.json(receipts)
  } catch (e) {
    next(e)
  }
}

const getReceipt = async () => {
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
  setReceipt(receipts)
  return new Promise((resolve, reject) => {
    resolve(receipts)
  })
}

export const getReceiptEveryHour = () => {
  const rule = new schedule.RecurrenceRule()
  rule.minute = new schedule.Range(0, 59, 60)
  schedule.scheduleJob(rule, async function () {
    await getReceipt()
  })
}

const checkCursorInResult = async (url) => {
  const result = await loyversConnect('GET', url)
  return result
}

const findPosDevicesName = (id, posDevices) => {
  const res = posDevices.find((p) => p.id === id)
  return res.name
}

const setReceipt = (value) => {
  const connect = storage.connect('./server/receipts.json')
  connect.state.receipts = value
  connect.save()
  // console.log('setReceipts')
}
