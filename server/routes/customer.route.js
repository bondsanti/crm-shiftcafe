import express from 'express'
import {
  allCustomer,
  allCustomerForAdmin,
  allEmployees,
  createCustomer,
} from '../controllers/customer.controller'
import requireSignIn from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', allCustomer)
router.get('/admin', requireSignIn, allCustomerForAdmin)
router.get('/employee', requireSignIn, allEmployees)
router.post('/', createCustomer)

export default router
