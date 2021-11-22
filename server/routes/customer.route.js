import express from 'express'
import {
  allCustomer,
  allCustomerForAdmin,
  allEmployees,
  createCustomer,
} from '../controllers/customer.controller'
import requireSignIn, { requireRole } from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', allCustomer)
router.get(
  '/admin',
  requireSignIn,
  requireRole('customer'),
  allCustomerForAdmin
)
router.get('/employee', requireSignIn, allEmployees)
router.post('/', createCustomer)

export default router
