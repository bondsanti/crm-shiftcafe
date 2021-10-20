<template>
  <div style="height: 100%">
    <Header title="สมัครสมาชิกสำเร็จ" icon="mdi-check-circle-outline" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col align="center">
        <v-avatar color="orange" size="150    ">
          <img src=" /logo.ico" alt="John" />
        </v-avatar>
        <h4>ขอขอบคุณ</h4>
        <h2>คุณ {{ customer.name || 'SHIFT CAFÉ' }}</h2>
        <p>ที่สมัครสมาชิกกับทางเรา</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'SUCCESS',
    }
  },
  computed: {
    customer() {
      return this.$store.state.customerAfterRegister
    },
  },
  created() {
    setTimeout(() => {
      this.$router.push('/detail')
    }, 3000)
  },
}
</script>
