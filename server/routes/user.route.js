import express from 'express'
import {
  allUser,
  createUser,
  deleteUser,
  me,
  signin,
  updateUser,
} from '../controllers/user.controler'
import requireSignIn from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, allUser)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/:id', deleteUser)
router.post('/signin', signin)
router.get('/me', requireSignIn, me)
export default router
