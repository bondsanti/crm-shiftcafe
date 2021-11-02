export default async (context) => {
  try {
    const res = await context.$axios.$get('/customer')
    // console.log(res)
    context.store.commit('setAllCustomers', res.customers)
  } catch (e) {
    console.log(e)
  }
}
