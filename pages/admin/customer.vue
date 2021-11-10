<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />
    <v-row class="ma-3">
      <AdminTable
        :title="title"
        icon="mdi-account"
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
  middleware: ['requireSignIn'],
  async asyncData({ $axios }) {
    const customers = await $axios.$get('/customer/admin')
    // console.log(customers)
    return { customers }
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
          text: 'ข้อมูลติดต่อ',
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
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      setTimeout(() => {
        this.customers.map((c) => {
          this.makeItRightForTable(c)
          return c
        })
        this.loading = false
      }, 1200)
    },
    makeItRightForTable(data) {
      const obj = {
        name: data.name,
        detail: data.email,
        phone: data.phone_number,
        buyFirst: this.$options.filters.dateThWithTime(data.first_visit),
        buyCurrent: this.$options.filters.dateThWithTime(data.last_visit),
        buyTotal: data.total_visits,
        totalSpent: this.$options.filters.currency(data.total_spent),
        totalPoints: data.total_points,
      }

      this.items.push(obj)
      // console.log(data)
    },
  },
}
</script>
