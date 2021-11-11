import express from 'express'
import {
  allAdviser,
  createAdviser,
  deleteAdviser,
  updateAdviser,
} from '../controllers/adviser.controller'
const router = express.Router()
router.get('/', allAdviser)
router.post('/', createAdviser)
router.put('/', updateAdviser)
router.delete('/:id', deleteAdviser)
export default router
