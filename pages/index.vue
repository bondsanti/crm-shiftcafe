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
          <v-btn dark rounded block color="red" @click="loginWithGoogle"
            ><v-icon left> mdi-google </v-icon>GOOGLE</v-btn
          >
        </v-row>
        <v-row v-show="errorText" justify="center" class="my-3">
          <v-alert
            color="red"
            outlined
            type="warning"
            prominent
            border="left"
            width="100%"
          >
            {{ errorText }}
          </v-alert>
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
      errorText: null,
    }
  },
  computed: {
    allCustomers() {
      return this.$store.state.allCustomers
    },
  },
  created() {
    // console.log(this.dataAfterLogin)
    // this.loginWithLine()
  },
  methods: {
    async loginWithLine() {
      try {
        this.errorText = null
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
      // console.log(this.allCustomers)
      return new Promise((resolve, reject) => {
        const result = this.allCustomers.find((c) => {
          return c.customer_code === customerCode
        })
        resolve(result)
      })
    },
    async loginWithFacebook() {
      try {
        this.errorText = null
        await this.$facebook.init({
          appId: '437943554425729',
          status: true,
          xfbml: true,
          version: 'v2.7',
        })
        console.log(this.$facebook)
        this.$facebook.login(async (response) => {
          console.log(response)
          if (response.authResponse) {
            console.log(response.authResponse.userID)
            // console.log(this.errorText)
            const customer = await this.findCustomersByCustomerCode(
              response.authResponse.userID
            )
            if (customer) {
              this.$store.commit('setCustomerAfterRegister', customer)
              this.$router.push('/detail')
            } else {
              this.$store.commit('setDataAfterLogin', {
                id: response.authResponse.userID,
              })
              this.$router.push('/form')
            }
          } else {
            this.errorText = 'User cancelled login or did not fully authorize.'
          }
        })
        // }
      } catch (e) {
        console.warn(e)
      }
    },
    async loginWithGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn()
        const customer = await this.findCustomersByCustomerCode(
          googleUser.nt.uT
        )
        if (customer) {
          this.$store.commit('setCustomerAfterRegister', {
            ...customer,
            img: googleUser.nt.nK,
          })
          this.$router.push('/detail')
        } else {
          const obj = {
            name: googleUser.nt.JU + ' ' + googleUser.nt.$S,
            img: googleUser.nt.nK,
            id: googleUser.nt.uT,
            email: googleUser.nt.Yt,
          }
          this.$store.commit('setDataAfterLogin', obj)
          this.$router.push('/form')
        }

        console.log(googleUser)
      } catch (e) {
        console.error(e)
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
