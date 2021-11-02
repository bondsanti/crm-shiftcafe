export default async (context) => {
  try {
    const res = await context.$axios.$get('/province')
    // console.log(res)
    const provincesForselect = res.data.map((p) => {
      const obj = { text: p.province, value: p.province }
      return obj
    })
    context.store.commit('setProvinces', provincesForselect)
  } catch (e) {
    console.log(e)
  }
}
