<template>
  <div style="height: 100%">
    <Header :title="headerTitle" :icon="icon" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="1" sm="2" md="3" lg="4"></v-col>
      <v-col cols="10" sm="8" md="6" lg="4" align="center">
        <v-form ref="form" v-model="valid" @submit.prevent="signIn">
          <v-row v-show="!progress" align="center">
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
          <v-row v-show="progress" justify="center" class="my-2">
            <v-progress-circular
              :size="80"
              color="primary"
              indeterminate
              width="10"
            ></v-progress-circular>
          </v-row>
          <v-row>
            <v-btn
              type="submit"
              :disabled="!valid"
              :loading="btnLoading"
              rounded
              block
              color="primary"
              >{{ headerTitle }}</v-btn
            >
          </v-row>
        </v-form>
      </v-col>

      <v-col cols="1" sm="2" md="3" lg="4"></v-col>
    </v-row>
  </div>
</template>
<script>
import Logo from '@/components/Logo.vue'
export default {
  middleware: ['ifSignIn'],
  data: () => ({
    login: { username: '', password: '' },
    valid: true,
    showPass: false,
    btnLoading: false,
    headerTitle: 'เข้าสู่ระบบ',
    icon: 'mdi-account-lock',
    progress: false,
  }),
  head() {
    return {
      title: 'SING IN',
    }
  },
  created() {
    // this.$store.dispatch('fetchCustomers')
  },
  methods: {
    async signIn() {
      try {
        this.btnLoading = true
        // console.log(this.login)
        const res = await this.$auth.loginWith('local', { data: this.login })
        this.btnLoading = false
        this.progress = true
        this.valid = false
        this.showAlert(res.data.message)
        this.headerTitle = 'กำลังโหลดข้อมูล'
        this.icon = 'mdi-account-convert'
        await this.$store.dispatch('fetchReceipts')
        this.headerTitle = 'กำลังโหลดข้อมูลใบเสร็จรับเงิน'
        await this.$store.dispatch('fetchCustomers')
        this.headerTitle = 'กำลังโหลดข้อมูลลูกค้า'
        await this.$store.dispatch('fetchEmployees')
        await this.$store.dispatch('fetchItems')
        this.headerTitle = 'กำลังโหลดข้อมูลสินค้า'
        await this.$store.dispatch('fetchCategories')
        await this.$store.dispatch('fetchAdvisers')
        await this.$store.dispatch('fetchUsers')
        // this.$toast.success(res.data.message)
        // console.log(res.data)
        this.progress = false
        this.headerTitle = 'โหลดข้อมูลเรียบร้อย'
        this.icon = 'mdi-account-lock'

        this.$router.push({ path: '/admin/report', redirect: 'actualRoute' })
      } catch (e) {
        this.btnLoading = false
        // this.$toast.error(e.response.data.error.message)
        // console.log(e.response.data.error)
        this.showAlertError(e.response.data.error.message)
      }
    },
    showAlert(msg) {
      this.$toast(msg, {
        position: 'top-right',
        timeout: 2543,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: false,
        closeButton: 'button',
        icon: Logo,
        rtl: false,
      })
    },
    showAlertError(msg) {
      this.$toast.error(msg, {
        position: 'top-right',
        timeout: 2543,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: false,
        closeButton: 'button',
        icon: Logo,
        rtl: false,
      })
    },
  },
}
</script>
