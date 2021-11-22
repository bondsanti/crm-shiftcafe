import express from 'express'
import {
  allAdviser,
  createAdviser,
  deleteAdviser,
  updateAdviser,
} from '../controllers/adviser.controller'
import requireSignIn, { requireRole } from './../middleware/authen.middleware'
const router = express.Router()
router.get('/', allAdviser)
router.post('/', requireSignIn, requireRole('add-adviser'), createAdviser)
router.put('/', requireSignIn, requireRole('edit-adviser'), updateAdviser)
router.delete(
  '/:id',
  requireSignIn,
  requireRole('delete-adviser'),
  deleteAdviser
)
export default router
