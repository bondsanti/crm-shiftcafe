export default (context) => {
  // console.log(context)
  context.$axios.setHeader(
    'Authorization',
    `Bearer ${context.env.loyverseToken}`
  )
  context.$axios
    .$get(
      'https://cors-anywhere.herokuapp.com/https://api.loyverse.com/v1.0/customers/'
    )
    .then((res) => {
      // console.log(res.customers)
      context.store.commit('setAllCustomers', res.customers)
      delete context.$axios.defaults.headers.common.Authorization
    })
}
