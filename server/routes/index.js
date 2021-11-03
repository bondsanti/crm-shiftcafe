import express from 'express'
// import fetch from 'node-fetch'
import customerRoute from './customer.route'
import provinceRoute from './province.route'
import adviserRoute from './adviser.route'
const router = express.Router()

router.use('/customer', customerRoute)
router.use('/province', provinceRoute)
router.use('/adviser', adviserRoute)

export default router
