<template>
  <div>
    <Header
      :title="`${auth.user.username}`"
      system-bar
      icon="mdi-chart-box"
      prominent
      dense
    />
    <v-row class="ma-3">
      <AdminTable
        :title="title"
        icon="mdi-account-group"
        btn
        target
        excel-first-col
        :headers="headers"
        :items="items"
        :loading="loading"
      />
    </v-row>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['requireSignIn', 'refreshData'],
  validate({ store }) {
    const { user } = store.state.auth
    // console.log(user)
    const result = user.role.includes('customer')
    if (!result) {
      const error = new Error(
        `คุณไม่มีสิทธิ์เข้าถึงส่วนของลูกค้า โปรดติดต่อผู้ดูแลระบบ`
      )
      error.statusCode = 401

      throw error
    }

    return user.role.includes('customer')
  },
  data() {
    return {
      title: 'ลูกค้า',
      headers: [
        {
          text: 'ลูกค้า',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'รายละเอียด',
          align: 'start',
          sortable: false,
          value: 'detail',
        },
        {
          text: 'ซื้อครั้งแรก',
          align: 'start',
          sortable: false,
          value: 'buyFirst',
        },
        {
          text: 'ซื้อครั้งล่าสุด',
          align: 'start',
          sortable: false,
          value: 'buyCurrent',
        },
        {
          text: 'ซื้อทั้งหมด',
          align: 'start',
          sortable: false,
          value: 'buyTotal',
        },
        {
          text: 'ยอดจ่ายทั้งหมด',
          align: 'start',
          sortable: false,
          value: 'totalSpent',
        },
        {
          text: 'แต้มสะสม',
          align: 'start',
          sortable: false,
          value: 'totalPoints',
        },
      ],
      items: [],
      loading: false,
    }
  },
  head() {
    return {
      title: 'ลูกค้า',
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
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      setTimeout(() => {
        this.adminData.customers.map((c) => {
          this.makeItRightForTable(c)
          return c
        })
        this.loading = false
        this.items = this.items.sort((a, b) => b.totalSpent - a.totalSpent)
      }, 1200)
    },
    makeItRightForTable(data) {
      const obj = {
        name: data.name,
        detail: data.email,
        adviseName: this.findAdviser(data.detail),
        phone: data.phone_number,
        buyFirst: this.$options.filters.dateThWithTime(data.first_visit),
        buyCurrent: this.$options.filters.dateThWithTime(data.last_visit),
        buyTotal: data.total_visits,
        totalSpent: data.total_spent,
        totalPoints: this.$options.filters.dateThWithTime(data.total_points),
      }

      this.items.push(obj)
      // console.log(data)
    },
    findAdviser(value) {
      // console.log(value.advise)
      const res = this.adminData.advisers.find(
        (a) => a.advise_code === value.advise
      )
      if (res) {
        return ' | ' + res.full_name
      } else {
        return ''
      }
    },
  },
}
</script>
