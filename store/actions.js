export default {
  clearState({ commit }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('receipts', JSON.stringify([]))
      commit('setReceipts', [])

      localStorage.setItem('customers', JSON.stringify([]))
      commit('setCustomers', [])

      localStorage.setItem('employees', JSON.stringify([]))
      commit('setEmployees', [])

      localStorage.setItem('items', JSON.stringify([]))
      commit('setItems', [])

      localStorage.setItem('categories', JSON.stringify([]))
      commit('setCategories', [])

      localStorage.setItem('advisers', JSON.stringify([]))
      commit('setAdvisers', [])

      localStorage.setItem('users', JSON.stringify([]))
      commit('setUsers', [])

      localStorage.setItem('incomeExpense', JSON.stringify([]))
      commit('setIncomeExpense', [])

      resolve('ok')
    })
  },
  async fetchReceipts({ commit }) {
    try {
      const res = await this.$axios.$get('/receipt')
      return new Promise((resolve, reject) => {
        localStorage.setItem('receipts', JSON.stringify(res))
        commit('setReceipts', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchCustomers({ commit }) {
    try {
      const res = await this.$axios.$get('/customer/admin')
      return new Promise((resolve, reject) => {
        localStorage.setItem('customers', JSON.stringify(res))
        commit('setCustomers', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchEmployees({ commit }) {
    try {
      const res = await this.$axios.$get('/customer/employee')
      return new Promise((resolve, reject) => {
        localStorage.setItem('employees', JSON.stringify(res))
        commit('setEmployees', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchItems({ commit }) {
    try {
      const res = await this.$axios.$get('/item')
      return new Promise((resolve, reject) => {
        localStorage.setItem('items', JSON.stringify(res))
        commit('setItems', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchCategories({ commit }) {
    try {
      const res = await this.$axios.$get('/item/category')
      return new Promise((resolve, reject) => {
        localStorage.setItem('categories', JSON.stringify(res))
        commit('setCategories', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchAdvisers({ commit }) {
    try {
      const res = await this.$axios.$get('/adviser')
      return new Promise((resolve, reject) => {
        localStorage.setItem('advisers', JSON.stringify(res))
        commit('setAdvisers', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchUsers({ commit }) {
    try {
      const res = await this.$axios.$get('/user')
      return new Promise((resolve, reject) => {
        localStorage.setItem('users', JSON.stringify(res))
        commit('setUsers', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchIncomeExpense({ commit }) {
    try {
      const res = await this.$axios.$get('/income-expense')
      // console.log(res)
      return new Promise((resolve, reject) => {
        localStorage.setItem('incomeExpense', JSON.stringify(res))
        commit('setIncomeExpense', res)
        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
  async fetchAllData({ commit }) {
    try {
      const receipts = await this.$axios.$get('/receipt')
      const customers = await this.$axios.$get('/customer/admin')
      const employees = await this.$axios.$get('/customer/employee')
      const items = await this.$axios.$get('/item')
      const categories = await this.$axios.$get('/item/category')
      const advisers = await this.$axios.$get('/adviser')
      const users = await this.$axios.$get('/user')
      const incomeExpense = await this.$axios.$get('/income-expense')
      return new Promise((resolve, reject) => {
        localStorage.setItem('receipts', JSON.stringify(receipts))
        commit('setReceipts', receipts)

        localStorage.setItem('customers', JSON.stringify(customers))
        commit('setCustomers', customers)

        localStorage.setItem('employees', JSON.stringify(employees))
        commit('setEmployees', employees)

        localStorage.setItem('items', JSON.stringify(items))
        commit('setItems', items)

        localStorage.setItem('categories', JSON.stringify(categories))
        commit('setCategories', categories)

        localStorage.setItem('advisers', JSON.stringify(advisers))
        commit('setAdvisers', advisers)

        localStorage.setItem('users', JSON.stringify(users))
        commit('setUsers', users)

        localStorage.setItem('incomeExpense', JSON.stringify(incomeExpense))
        commit('setIncomeExpense', incomeExpense)

        resolve('ok')
      })
    } catch (e) {
      console.error(e)
    }
  },
}
