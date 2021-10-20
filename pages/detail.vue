<template>
  <div>
    <Header title="รายละเอียดสมาชิก" icon="mdi-card-account-details-outline" />
    <v-row justify="center" class="mt-2">
      <v-col align="center">
        <v-avatar color="orange" size="150    ">
          <img src=" /logo.ico" alt="John" />
        </v-avatar>
        <p id="font" class="title font-weight-bold font-weight-black">
          คุณ {{ customer.name || 'SHIFT CAFÉ' }}
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <div id="font" class="title mx-1">อีเมลล์ :</div>
      <div id="font" class="title mx-1 font-weight-bold font-weight-black">
        {{ customer.email || 'shift.restaurant.center@gmail.com' }}
      </div>
    </v-row>
    <v-row justify="center">
      <div id="font" class="title mx-1">เบอร์โทรศัพท์ :</div>
      <div id="font" class="title mx-1 font-weight-bold font-weight-black">
        {{ customer.phone_number || '0917961816' }}
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
  </div>
</template>
<script>
export default {
  computed: {
    customer() {
      return this.$store.state.customerAfterRegister
    },
  },
  methods: {
    formatPrice(totalPrice) {
      const value = parseInt(totalPrice)
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>
<style>
#font {
  font-family: 'Mitr', sans-serif !important;
}
</style>
