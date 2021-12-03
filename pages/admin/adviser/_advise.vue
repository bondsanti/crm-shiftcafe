<template>
  <v-row class="ma-3">
    <AdminTable
      excel-first-col
      target
      :title="title"
      :headers="headers"
      :loading="loading"
      :items="items"
    />
  </v-row>
</template>
<script>
export default {
  middleware: ['requireSignIn', 'refreshData'],
  validate({ params, query, store }) {
    const { adminData, auth } = store.state
    const { advisers } = adminData
    const checkRole = auth.user.role.includes('customer-under-another-advise')
    const newAdvisers = checkRole
      ? [...advisers, { advise_code: 'all' }]
      : advisers

    const result = newAdvisers.find((a) => a.advise_code === params.advise)
    if (!result) {
      const error = new Error(`ไม่พบรหัสตัวแทน ${params.advise} รหัสนี้ ในระบบ`)
      error.statusCode = 410

      throw error
    }
    return newAdvisers.some((n) => n.advise_code === params.advise)
  },
  transition: 'home',
  data() {
    return {
      title: 'รายชื่อลูกค้า',
      headers: [
        {
          text: 'รหัสตัวแทน',
          align: 'start',
          sortable: false,
          value: 'advise_code',
        },
        {
          text: 'ชื่อ-นามสกุลตัวแทน',
          align: 'start',
          sortable: false,
          value: 'full_name_adviser',
        },
        {
          text: 'ชื่อ-นามสกุลลูกค้า',
          align: 'start',
          sortable: false,
          value: 'full_name_customer',
        },
        {
          text: 'การใช้จ่ายในร้าน',
          align: 'start',
          sortable: false,
          value: 'totalSpent',
        },
      ],
      items: [],
      loading: false,
      timeout: null,
    }
  },

  head() {
    return {
      title: 'รายชื่อลูกค้า',
    }
  },

  computed: {
    adminData() {
      return this.$store.state.adminData
    },
    auth() {
      return this.$store.state.auth
    },
  },
  watch: {
    '$route.params.advise': {
      handler(advise) {
        const checkRole = this.auth.user.role.includes(
          'customer-under-another-advise'
        )
        const checkIsAdvier = this.auth.user.userAffiliate === null
        const adviser = this.findAdviser(advise)
        let error
        if (!checkRole) {
          if (checkIsAdvier) {
            error = new Error(`คุณไม่ได้เป็นตัวแทน`)
            error.statusCode = 401

            throw error
          }
          const checkAdviseCodeParams =
            this.auth.user.userAffiliate !== adviser.id

          if (checkAdviseCodeParams) {
            error = new Error(`คุณไม่สามารถดูรายชื่อลูกค้าของตัวแทนคนอื่นได้`)
            error.statusCode = 401

            throw error
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getData()
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },

  methods: {
    getData() {
      let customersByAdvise = this.adminData.customers.filter(
        (c) => c.detail.advise !== null
      )
      if (this.$route.params.advise !== 'all') {
        this.title = 'แนะนำโดยรหัส ' + this.$route.params.advise
        customersByAdvise = customersByAdvise.filter(
          (c) => c.detail.advise === this.$route.params.advise
        )
      }

      this.loading = true
      this.timeout = setTimeout(() => {
        customersByAdvise.map((c) => {
          this.makeItRightForTable(c)
          return c
        })
        this.loading = false
        this.items = this.items.sort((a, b) => b.totalSpent - a.totalSpent)
      }, 1200)
    },
    makeItRightForTable(data) {
      // console.log(data)
      const obj = {
        advise_code: data.detail.advise,
        full_name_adviser: this.findAdviser(data.detail.advise).full_name,
        full_name_customer: data.name,
        totalSpent: data.total_spent,
      }
      this.items.push(obj)
      // console.log(data)
    },
    findAdviser(adviseCode) {
      const result = this.adminData.advisers.find(
        (a) => a.advise_code === adviseCode
      )
      return result
    },
  },
}
</script>
