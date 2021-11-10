<template>
  <v-snackbar v-model="alert.status" top right outlined>
    <v-row no-gutters align="center">
      <v-col cols="3"
        ><v-icon size="40" color="primary">mdi-home</v-icon></v-col
      >
      <v-col cols="9"><h3>ไม่พบชื่อผู้ใช้</h3></v-col>
      <v-col cols="12">
        <v-progress-linear
          height="10"
          buffer-value="0"
          stream
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-snackbar>
</template>
<script>
export default {
  computed: {
    alert() {
      return this.$store.state.alert
    },
  },
  //   created() {
  //     setTimeout(() => {
  //       this.$store.commit('setAlert', {
  //         status: false,
  //       })
  //     }, 1500)
  //   },
}
</script>
