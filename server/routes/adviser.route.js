import express from 'express'
import { allAdviser } from '../controllers/adviser.controller'
const router = express.Router()
router.get('/', allAdviser)
export default router
