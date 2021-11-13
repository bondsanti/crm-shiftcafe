import express from 'express'
import {
  allAdviser,
  createAdviser,
  deleteAdviser,
  updateAdviser,
} from '../controllers/adviser.controller'
import requireSignIn from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', requireSignIn, allAdviser)
router.post('/', requireSignIn, createAdviser)
router.put('/', requireSignIn, updateAdviser)
router.delete('/:id', requireSignIn, deleteAdviser)
export default router
