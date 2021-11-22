import express from 'express'
import { allCategory, allItem } from '../controllers/item.controller'
import requireSignIn, { requireRole } from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, requireRole('item'), allItem)
router.get('/category', requireSignIn, requireRole('item'), allCategory)
export default router
