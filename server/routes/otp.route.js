import express from 'express'
import { compareOTP, requestOTP } from '../controllers/otp.controller'
const router = express.Router()
router.post('/request', requestOTP)
router.post('/compare', compareOTP)
export default router
