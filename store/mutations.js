export default {
  setCustomerAfterRegister: (state, value) =>
    (state.customerAfterRegister = value),
  setAllCustomers: (state, value) => (state.allCustomers = value),
  setProvinces: (state, value) => (state.provinces = value),
  setDataAfterLogin: (state, value) => (state.dataAfterLogin = value),
  setLoginType: (state, value) => (state.loginType = value),
  setReceipts: (state, value) => (state.adminData.receipts = value),
  setCustomers: (state, value) => (state.adminData.customers = value),
  setEmployees: (state, value) => (state.adminData.employees = value),
  setItems: (state, value) => (state.adminData.items = value),
  setCategories: (state, value) => (state.adminData.categories = value),
  setAdvisers: (state, value) => (state.adminData.advisers = value),
}
