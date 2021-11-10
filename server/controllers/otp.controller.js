import thaibulksmsApi from 'thaibulksms-api'
import { THAI_BULK_KEY, THAI_BULK_SECRET } from '../constant'
const options = {
  apiKey: THAI_BULK_KEY,
  apiSecret: THAI_BULK_SECRET,
}
const otp = thaibulksmsApi.otp(options)
export const requestOTP = async (req, res, next) => {
  try {
    const result = await otp.request(req.body.phoneNumber)
    res.json(result.data)
  } catch (e) {
    next(e)
  }
}

export const compareOTP = async (req, res, next) => {
  try {
    const result = await otp.verify(req.body.otpToken, req.body.otpCode)
    res.json(result.data)
  } catch (e) {
    next(e)
  }
}
