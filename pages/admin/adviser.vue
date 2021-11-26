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
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ตัวแทน"
          route-name="admin-adviser"
          to="/admin/adviser"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="รายชื่อลูกค้า"
          icon="mdi-receipt"
          route-name="admin-adviser-advise"
          :to="`/admin/adviser/${findAdviser}`"
        />
      </v-col>
    </v-row>
    <nuxt-child></nuxt-child>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  validate({ store }) {
    const { user } = store.state.auth
    // console.log(user)
    const result = user.role.includes('adviser')
    if (!result) {
      const error = new Error(
        `คุณไม่มีสิทธิ์เข้าถึงส่วนของตัวแทน โปรดติดต่อผู้ดูแลระบบ`
      )
      error.statusCode = 401

      throw error
    }

    return user.role.includes('adviser')
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    adminData() {
      return this.$store.state.adminData
    },
    findAdviser() {
      const result = this.adminData.advisers.find(
        (a) => a.id === this.auth.user.userAffiliate
      )
      return this.auth.user.userAffiliate ? result.advise_code : 'all'
    },
  },
  methods: {
    // findAdviser(adviseCode) {
    //   const result = this.adminData.advisers.find(
    //     (a) => a.advise_code === adviseCode
    //   )
    //   return result.advise_code
    // },
  },
}
</script>
