<template>
  <div>
    <Header
      :title="`${auth.user.username}`"
      system-bar
      icon="mdi-chart-box"
      prominent
      dense
    />
    <v-row dense class="ma-2">
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard
          title="สรุปยอดขาย"
          route-name="admin-report"
          to="/admin/report"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard
          title="ใบเสร็จรับเงิน"
          icon="mdi-receipt"
          route-name="admin-report-receipt"
          to="/admin/report/receipt"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามหมวดหมู่"
          icon="mdi-food-off-outline"
          route-name="admin-report-category"
          to="/admin/report/category"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามสินค้า"
          icon="mdi-food-fork-drink"
          route-name="admin-report-item"
          to="/admin/report/item"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามตัวเลือก"
          icon="mdi-food-variant"
          route-name="admin-report-option"
          to="/admin/report/option"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard
          title="รายรับ-รายจ่าาย"
          icon="mdi-account-cash"
          route-name="admin-report-income_expense"
          to="/admin/report/income_expense"
        />
      </v-col>
    </v-row>
    <!-- <nuxt-child
      :all-receipts="adminData.receipts"
      :customers="adminData.customers"
      :employees="adminData.employees"
    ></nuxt-child> -->
    <nuxt-child></nuxt-child>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['requireSignIn'],
  validate({ store }) {
    const { user } = store.state.auth
    // console.log(user)
    const result = user.role.includes('report')
    if (!result) {
      const error = new Error(
        `คุณไม่มีสิทธิ์เข้าถึงส่วนรายงาน โปรดติดต่อผู้ดูแลระบบ`
      )
      error.statusCode = 401

      throw error
    }

    return user.role.includes('report')
  },
  computed: {
    // adminData() {
    //   return this.$store.state.adminData
    // },
    auth() {
      return this.$store.state.auth
    },
  },
  created() {
    // console.log(this.adminData)
  },
}
</script>
