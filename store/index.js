export const state = () => ({
  allCustomers: [],
  customerAfterRegister: {},
  provinces: [],
  dataAfterLogin: {},
  loginType: '',
  adminData: {
    receipts: [],
    items: [],
    customers: [],
    employees: [],
  },
})

export const mutations = {
  setCustomerAfterRegister: (state, value) =>
    (state.customerAfterRegister = value),
  setAllCustomers: (state, value) => (state.allCustomers = value),
  setProvinces: (state, value) => (state.provinces = value),
  setDataAfterLogin: (state, value) => (state.dataAfterLogin = value),
  setLoginType: (state, value) => (state.loginType = value),
  setReceipts: (state, value) => (state.adminData.receipts = value),
  setCustomers: (state, value) => (state.adminData.customers = value),
  setEmployees: (state, value) => (state.adminData.employees = value),
}

export const actions = {
  async fetchReceipts({ commit }) {
    const res = await this.$axios.$get('/receipt')
    commit('setReceipts', res)
  },
  async fetchCustomers({ commit }) {
    const res = await this.$axios.$get('/customer/admin')
    commit('setCustomers', res)
  },
  async fetchEmployees({ commit }) {
    const res = await this.$axios.$get('/customer/employee')
    commit('setEmployees', res)
  },
}
