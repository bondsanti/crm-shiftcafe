<template>
  <div style="height: 100%">
    <Header title="เข้าสู่ระบบ" icon="mdi-account-lock" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="1" sm="2" md="3" lg="4"></v-col>
      <v-col cols="10" sm="8" md="6" lg="4" align="center">
        <v-form ref="form" v-model="valid" @submit.prevent="signIn">
          <v-row align="center">
            <v-col cols="4" justify="start" class="pt-0">
              <v-img height="100%" width="100%" src="/logo.ico"> </v-img>
            </v-col>
            <v-col cols="8">
              <v-row>
                <v-text-field
                  v-model="login.username"
                  label="ชื่อผู้ใช้"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้']"
                  append-icon="mdi-account"
                  filled
                  rounded
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="login.password"
                  filled
                  rounded
                  :type="!showPass ? 'password' : 'text'"
                  label="รหัสผ่าน"
                  autocomplete
                  :rules="[(v) => !!v || 'กรุณากรอกรหัสผ่าน']"
                  :append-icon="!showPass ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPass = !showPass"
                >
                </v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              type="submit"
              :disabled="!valid"
              rounded
              block
              color="primary"
              >เข้าสู่ระบบ</v-btn
            >
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="1" sm="2" md="3" lg="4"></v-col>

      <!-- <v-btn dark color="red darken-2" @click="snackbar"> Open Snackbar </v-btn> -->
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: ['ifSignIn'],
  data: () => ({
    login: { username: '', password: '' },
    valid: true,
    showPass: false,
  }),
  head() {
    return {
      title: 'SING IN',
    }
  },
  methods: {
    async signIn() {
      try {
        console.log(this.login)
        const res = await this.$auth.loginWith('local', { data: this.login })
        // this.$toast.success(res.data.message)
        console.log(res)
        this.$router.push('/admin/report')
      } catch (e) {
        // this.$toast.error(e.response.data.error.message)
        console.log(e.response.data.error)
      }
    },
    snackbar() {
      this.$store.commit('setAlert', {
        status: true,
      })
    },
  },
}
</script>
