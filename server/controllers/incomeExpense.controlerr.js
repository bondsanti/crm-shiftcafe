import HandyStorage from 'handy-storage'
import { findValueById, randomId } from '../help'
const storage = new HandyStorage({
  beautify: true,
})
export const allIcomeExpense = (req, res, next) => {
  try {
    const connect = storage.connect('./server/incomeExpense.json')
    res.json(connect.state.incomeExpense)
  } catch (e) {
    next(e)
  }
}

export const createIncomeExpense = async (req, res, next) => {
  try {
    const connect = storage.connect('./server/incomeExpense.json')
    const { date, income, expense, expenseDetail } = req.body
    const { incomeExpense } = connect.state
    const obj = {
      id: await randomId(),
      date,
      income,
      expense,
      expenseDetail,
    }
    incomeExpense.push(obj)
    connect.save()
    res.json(connect.state.incomeExpense)
  } catch (e) {
    next(e)
  }
}

export const updateIncomeExpense = async (req, res, next) => {
  try {
    const connect = storage.connect('./server/incomeExpense.json')
    const { id } = req.params
    const { date, income, expense, expenseDetail } = req.body
    const { incomeExpense } = connect.state
    const index = await findValueById(incomeExpense, id)
    incomeExpense[index].date = date
    incomeExpense[index].income = income
    incomeExpense[index].expense = expense
    incomeExpense[index].expenseDetail = expenseDetail
    connect.save()
    res.json(connect.state.incomeExpense)
  } catch (e) {
    next(e)
  }
}

export const deleteIncomeExpense = async (req, res, next) => {
  try {
    const connect = storage.connect('./server/incomeExpense.json')
    const { id } = req.params
    const { incomeExpense } = connect.state
    const index = await findValueById(incomeExpense, id)
    incomeExpense.splice(index, 1)
    connect.save()
    res.json(connect.state.incomeExpense)
  } catch (e) {
    next(e)
  }
}
