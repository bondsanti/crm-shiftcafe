export default {
  async fetchReceipts({ commit }) {
    const res = await this.$axios.$get('/receipt')
    return new Promise((resolve, reject) => {
      localStorage.setItem('receipts', JSON.stringify(res))
      commit('setReceipts', res)
      resolve('ok')
    })
  },
  async fetchCustomers({ commit }) {
    const res = await this.$axios.$get('/customer/admin')
    return new Promise((resolve, reject) => {
      localStorage.setItem('customers', JSON.stringify(res))
      commit('setCustomers', res)
      resolve('ok')
    })
  },
  async fetchEmployees({ commit }) {
    const res = await this.$axios.$get('/customer/employee')
    return new Promise((resolve, reject) => {
      localStorage.setItem('employees', JSON.stringify(res))
      commit('setEmployees', res)
      resolve('ok')
    })
  },
  async fetchItems({ commit }) {
    const res = await this.$axios.$get('/item')
    return new Promise((resolve, reject) => {
      localStorage.setItem('items', JSON.stringify(res))
      commit('setItems', res)
      resolve('ok')
    })
  },
  async fetchCategories({ commit }) {
    const res = await this.$axios.$get('/item/category')
    return new Promise((resolve, reject) => {
      localStorage.setItem('categories', JSON.stringify(res))
      commit('setCategories', res)
      resolve('ok')
    })
  },
  async fetchAdvisers({ commit }) {
    const res = await this.$axios.$get('/adviser')
    return new Promise((resolve, reject) => {
      localStorage.setItem('advisers', JSON.stringify(res))
      commit('setAdvisers', res)
      resolve('ok')
    })
  },
}
