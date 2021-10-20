export default async (context) => {
  try {
    // console.log(context)
    context.$axios.setHeader(
      'Authorization',
      `Bearer ${context.env.loyverseToken}`
    )

    const res = await context.$axios.$get(
      'https://cors-anywhere.herokuapp.com/https://api.loyverse.com/v1.0/customers/'
    )
    context.store.commit('setAllCustomers', res.customers)
    delete context.$axios.defaults.headers.common.Authorization
  } catch (e) {
    console.log(e)
  }
}
