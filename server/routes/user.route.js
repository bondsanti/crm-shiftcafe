import express from 'express'
import { allUser } from '../controllers/user.controler'
const router = express.Router()
router.get('/', allUser)
export default router
