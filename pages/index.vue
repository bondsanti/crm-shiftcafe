<template>
  <div style="height: 100%">
    <Header />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="1" md="2" lg="4"></v-col>
      <v-col align="center">
        <v-row justify="center">
          <v-avatar color="orange" size="100">
            <img src=" /logo.ico" alt="John" />
          </v-avatar>
        </v-row>
        <v-row justify="center" class="my-3">
          <h3>SHIFT CAFÉ</h3>
        </v-row>
        <v-row justify="center" class="my-3">
          <v-btn dark rounded block color="green" @click="$router.push('/line')"
            ><v-icon left> mdi-chat </v-icon>LINE</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3">
          <v-btn dark rounded block color="blue"
            ><v-icon left> mdi-facebook </v-icon>FACEBOOK</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3">
          <v-btn dark rounded block color="red"
            ><v-icon left> mdi-google </v-icon>GOOGLE</v-btn
          >
        </v-row>
      </v-col>
      <v-col cols="1" md="2" lg="4"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: 'getCustomer',
  data() {
    return {}
  },
  computed: {},
  created() {
    // this.loginWithLine()
  },
  methods: {},
}
</script>
<style>
.v-input__control input {
  text-align: center;
}
</style>
