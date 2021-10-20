<template>
  <div style="height: 100%">
    <Header title="ยินดีต้อนรับ" />
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
          <v-btn dark rounded block color="green" @click="loginWithLine"
            ><v-icon left> mdi-chat </v-icon>LINE</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3">
          <v-btn dark rounded block color="blue" @click="loginWithFacebook"
            ><v-icon left> mdi-facebook </v-icon>FACEBOOK</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3">
          <v-btn disabled dark rounded block color="red"
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
    return {
      lineData: {},
    }
  },
  computed: {
    allCustomers() {
      return this.$store.state.allCustomers
    },
  },
  created() {
    console.log(this.dataAfterLogin)
    // this.loginWithLine()
  },
  methods: {
    async loginWithLine() {
      try {
        await this.$liff.init({ liffId: '1656544842-bvKoPqBv' })

        if (this.$liff.isLoggedIn()) {
          // console.log('login')
          this.$liff.getProfile().then(async (res) => {
            console.log(res)
            const customer = await this.findCustomersByCustomerCode(res.userId)
            // const customer = await this.findCustomersByCustomerCode('57889654')
            console.log(customer)
            if (customer) {
              this.$store.commit('setCustomerAfterRegister', {
                ...customer,
                img: res.pictureUrl,
              })
              this.$router.push('/detail')
            } else {
              const obj = {
                name: res.displayName,
                img: res.pictureUrl,
                id: res.userId,
              }
              this.$store.commit('setDataAfterLogin', obj)
              this.$router.push('/form')
            }
          })
        } else {
          this.$liff.login()
        }
      } catch (e) {
        console.warn(e)
      }
    },
    findCustomersByCustomerCode(customerCode) {
      console.log(this.allCustomers)
      return new Promise((resolve, reject) => {
        const result = this.allCustomers.find((c) => {
          return c.customer_code === customerCode
        })
        resolve(result)
      })
    },
    loginWithFacebook() {
      try {
        this.$facebook.init({
          appId: '437943554425729',
          status: true,
          xfbml: true,
          version: 'v2.7',
        })

        // console.log(res)
        console.log(this.$facebook)
        this.$facebook.login(function (response) {
          console.log(response)
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ')
            this.$facebook.api('/me', function (response) {
              console.log('Good to see you, ' + response.name + '.')
            })
          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
        })
        // }
      } catch (e) {
        console.warn(e)
      }
    },
  },
}
</script>
<style>
.v-input__control input {
  text-align: center;
}
</style>
