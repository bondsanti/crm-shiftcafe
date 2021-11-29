export default (context) => {
  try {
    const receipts = localStorage.getItem('receipts')
    const customers = localStorage.getItem('customers')
    const employees = localStorage.getItem('employees')
    const items = localStorage.getItem('items')
    const categories = localStorage.getItem('categories')
    const advisers = localStorage.getItem('advisers')
    const users = localStorage.getItem('users')
    const incomeExpense = localStorage.getItem('incomeExpense')
    context.store.commit('setReceipts', JSON.parse(receipts))
    context.store.commit('setCustomers', JSON.parse(customers))
    context.store.commit('setEmployees', JSON.parse(employees))
    context.store.commit('setItems', JSON.parse(items))
    context.store.commit('setCategories', JSON.parse(categories))
    context.store.commit('setAdvisers', JSON.parse(advisers))
    context.store.commit('setUsers', JSON.parse(users))
    context.store.commit('setIncomeExpense', JSON.parse(incomeExpense))

    // console.log(JSON.parse(receipts))
  } catch (e) {
    console.log(e)
  }
}
