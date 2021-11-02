import express from 'express'
// import fetch from 'node-fetch'
import customerRoute from './customer.route'
import provinceRoute from './province.route'
const router = express.Router()

router.use('/customer', customerRoute)
router.use('/province', provinceRoute)

export default router
