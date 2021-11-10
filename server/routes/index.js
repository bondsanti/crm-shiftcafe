import express from 'express'
// import fetch from 'node-fetch'
import customerRoute from './customer.route'
import provinceRoute from './province.route'
import adviserRoute from './adviser.route'
import receiptRoute from './receipt.route'
import itemRoute from './item.route'
import userRoute from './user.route'
import otpRoute from './otp.route'
const router = express.Router()

router.use('/customer', customerRoute)
router.use('/province', provinceRoute)
router.use('/adviser', adviserRoute)
router.use('/receipt', receiptRoute)
router.use('/item', itemRoute)
router.use('/user', userRoute)
router.use('/otp', otpRoute)

export default router
