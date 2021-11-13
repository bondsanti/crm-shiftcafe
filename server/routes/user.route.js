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
router.post('/', requireSignIn, createUser)
router.put('/', requireSignIn, updateUser)
router.delete('/:id', requireSignIn, deleteUser)
router.post('/signin', signin)
router.get('/me', requireSignIn, me)
export default router
