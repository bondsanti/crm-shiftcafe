import express from 'express'
import { getAllReceipt } from '../controllers/receipt.controller'
import requireSignIn from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, getAllReceipt)
export default router
