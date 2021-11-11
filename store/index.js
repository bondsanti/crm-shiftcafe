import mutationsExternal from './mutations'
import actionsExternal from './actions'
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
    categories: [],
    advisers: [],
  },
})

export const mutations = mutationsExternal

export const actions = actionsExternal
