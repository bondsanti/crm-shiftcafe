<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />
    <v-row dense class="ma-2">
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="สรุปยอดขาย"
          route-name="admin-report"
          to="/admin/report"
        />
      </v-col>
      <!-- <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามหมวดหมู่"
          icon="mdi-food-off-outline"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามประเภทการชำระเงิน"
          icon="mdi-cash-register"
        />
      </v-col> -->
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ใบเสร็จรับเงิน"
          icon="mdi-receipt"
          route-name="admin-report-receipt"
          to="/admin/report/receipt"
        />
      </v-col>
    </v-row>
    <nuxt-child
      :all-receipts="receipts"
      :customers="customers"
      :employees="employees"
    ></nuxt-child>
  </div>
</template>
<script>
export default {
  middleware: ['requireSignIn'],
  async asyncData({ $axios }) {
    const [result, customers, employees] = await Promise.all([
      $axios.$get('/receipt'),
      $axios.$get('/customer/admin'),
      $axios.$get('/customer/employee'),
    ])
    // const { receipts } = result
    // console.log(customers)
    // const receipt2 = result.filter((r) => r.cancelled_at === null)
    return { receipts: result, customers, employees }
  },
}
</script>
