import express from 'express'
import {
  allCustomer,
  allCustomerForAdmin,
  allEmployees,
  createCustomer,
} from '../controllers/customer.controller'
const router = express.Router()
router.get('/', allCustomer)
router.get('/admin', allCustomerForAdmin)
router.get('/employee', allEmployees)
router.post('/', createCustomer)

export default router
