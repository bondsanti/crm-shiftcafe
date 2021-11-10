import express from 'express'
import { allUser, me, signin } from '../controllers/user.controler'
import requireSignIn from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, allUser)
router.post('/signin', signin)
router.get('/me', requireSignIn, me)
export default router
