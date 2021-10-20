export const state = () => ({
  allCustomers: [],
  customerAfterRegister: {},
})

export const mutations = {
  setCustomerAfterRegister: (state, value) =>
    (state.customerAfterRegister = value),
  setAllCustomers: (state, value) => (state.allCustomers = value),
}
