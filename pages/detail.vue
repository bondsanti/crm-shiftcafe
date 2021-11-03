<template>
  <div style="height: 100%">
    <Header title="รายละเอียดสมาชิก" icon="mdi-card-account-details-outline" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="1" md="2" lg="4"></v-col>
      <v-col cols="10" md="8" lg="4" align="center">
        <v-row justify="center" class="mt-auto">
          <v-avatar color="orange" size="150    ">
            <img :src="customer.img || '/logo.ico'" alt="John" />
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <p id="font" class="title font-weight-bold font-weight-black">
            คุณ {{ customer.name || 'SHIFT CAFÉ' }}
          </p>
        </v-row>
        <v-row justify="center">
          <div id="font" class="title mx-1">อีเมล :</div>
          <div
            id="font"
            class="title mx-1 font-weight-bold font-weight-black text-truncate"
          >
            {{ customer.email || '...' }}
          </div>
        </v-row>
        <v-row justify="center">
          <div id="font" class="title mx-1">เบอร์โทรศัพท์ :</div>
          <div id="font" class="title mx-1 font-weight-bold font-weight-black">
            {{ customer.phone_number || '...' }}
          </div>
        </v-row>
        <v-row justify="center">
          <div id="font" class="title mx-1">ยอดจ่ายทั้งหมด :</div>
          <div id="font" class="title mx-1 font-weight-bold font-weight-black">
            {{ formatPrice(customer.total_spent || 0) }} บาท
          </div>
        </v-row>
        <v-row justify="center">
          <div id="font" class="title mx-1">แต้มสะสม :</div>
          <div id="font" class="title mx-1 font-weight-bold font-weight-black">
            {{ customer.total_points || 0 }} แต้ม
          </div>
        </v-row>
        <v-row justify="center" class="mt-12">
          <v-btn
            :loading="logoutLoading"
            color="primary"
            block
            rounded
            @click="logout"
            >ออกจากระบบ</v-btn
          >
        </v-row>
      </v-col>
      <v-col cols="1" md="2" lg="4"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logoutLoading: false,
    }
  },
  head() {
    return {
      title: this.customer.name || 'SHIFT CAFÉ',
    }
  },
  computed: {
    customer() {
      return this.$store.state.customerAfterRegister
    },
    loginType() {
      return this.$store.state.loginType
    },
  },
  methods: {
    formatPrice(totalPrice) {
      const value = parseInt(totalPrice)
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async logout() {
      try {
        this.logoutLoading = true
        if (this.loginType === 'Line') {
          await this.$liff.logout()
        } else if (this.loginType === 'Facebook') {
          await window.FB.logout()
        } else if (this.loginType === 'Google') {
          await this.$gAuth.signOut()
        }
        this.$store.commit('setCustomerAfterRegister', {})
        this.$router.push('/')
        this.logoutLoading = false
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style>
#font {
  font-family: 'Mitr', sans-serif !important;
}
</style>
