import express from 'express'
import { getAllReceipt } from '../controllers/receipt.controller'
const router = express.Router()
router.get('/', getAllReceipt)
export default router
