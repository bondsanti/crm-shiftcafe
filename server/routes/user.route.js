import express from 'express'
import {
  allUser,
  createUser,
  deleteUser,
  me,
  signin,
  updateUser,
} from '../controllers/user.controler'
import requireSignIn, { requireRole } from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, allUser)
router.post('/', requireSignIn, requireRole('add-user'), createUser)
router.put('/', requireSignIn, requireRole('edit-user'), updateUser)
router.delete('/:id', requireSignIn, requireRole('delete-user'), deleteUser)
router.post('/signin', signin)
router.get('/me', requireSignIn, me)
export default router
