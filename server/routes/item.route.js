import express from 'express'
import { allCategory, allItem } from '../controllers/item.controller'
import requireSignIn from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, allItem)
router.get('/category', requireSignIn, allCategory)
export default router
