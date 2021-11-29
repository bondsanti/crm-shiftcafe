import express from 'express'
import {
  getAllReceipt,
  getAllReceiptFormLoyverseServer,
} from '../controllers/receipt.controller'
import requireSignIn from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, getAllReceipt)
router.get('/loyverse', requireSignIn, getAllReceiptFormLoyverseServer)
export default router
