import express from 'express'
import {
  allIcomeExpense,
  createIncomeExpense,
  deleteIncomeExpense,
  updateIncomeExpense,
} from '../controllers/incomeExpense.controlerr'
const router = express.Router()

router.get('/', allIcomeExpense)
router.post('/', createIncomeExpense)
router.put('/:id', updateIncomeExpense)
router.delete('/:id', deleteIncomeExpense)

export default router
