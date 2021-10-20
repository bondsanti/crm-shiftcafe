export default (context) => {
  // console.log(context)

  context.$axios
    .$get(
      'https://cors-anywhere.herokuapp.com/https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces'
    )
    .then((res) => {
      // console.log(res.customers)
      const provincesForselect = res.data.map((p) => {
        const obj = { text: p.province, value: p.province }
        return obj
      })
      context.store.commit('setProvinces', provincesForselect)
    })
}
