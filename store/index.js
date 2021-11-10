export const state = () => ({
  allCustomers: [],
  customerAfterRegister: {},
  provinces: [],
  dataAfterLogin: {},
  loginType: '',
  alert: {
    status: false,
  },
})

export const mutations = {
  setCustomerAfterRegister: (state, value) =>
    (state.customerAfterRegister = value),
  setAllCustomers: (state, value) => (state.allCustomers = value),
  setProvinces: (state, value) => (state.provinces = value),
  setDataAfterLogin: (state, value) => (state.dataAfterLogin = value),
  setLoginType: (state, value) => (state.loginType = value),
  setAlert: (state, value) => (state.alert = value),
}
