import express from 'express'
import { allCategory, allItem } from '../controllers/item.controller'
const router = express.Router()
router.get('/', allItem)
router.get('/category', allCategory)
export default router
