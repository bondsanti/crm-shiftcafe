import express from 'express'
import { allCustomer, createCustomer } from '../controllers/customer.controller'
const router = express.Router()
router.get('/', allCustomer)
router.post('/', createCustomer)

export default router
