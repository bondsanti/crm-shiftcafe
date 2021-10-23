<template>
  <div style="height: 100%">
    <Header title="ยินดีต้อนรับ" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="1" md="2" lg="4"></v-col>
      <v-col cols="10" md="8" lg="4" align="center">
        <v-row justify="center">
          <v-avatar color="orange" size="100">
            <img src=" /logo.ico" alt="John" />
          </v-avatar>
        </v-row>
        <v-row justify="center" class="my-3">
          <h3>SHIFT CAFÉ</h3>
        </v-row>
        <v-row justify="center" class="my-3">
          <p>สมัครสมาชิกด้วย</p>
        </v-row>
        <v-row justify="center" class="hidden-sm-and-down">
          <v-col cols="12" md="4" align="right">
            <v-btn icon fab dark color="green" @click="loginWithLine"
              ><v-icon left> mdi-chat </v-icon>LINE</v-btn
            >
          </v-col>
          <v-col cols="12" md="4">
            <v-btn icon fab dark color="blue" @click="loginWithFacebook"
              ><v-icon left> mdi-facebook </v-icon>FACEBOOK</v-btn
            >
          </v-col>
          <v-col cols="12" md="4" align="left">
            <v-btn icon fab dark color="red" @click="loginWithGoogle"
              ><v-icon left> mdi-google </v-icon>GOOGLE</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center" class="my-3 d-md-none">
          <v-btn block outlined dark color="green" @click="loginWithLine"
            ><v-icon left> mdi-chat </v-icon>LINE</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3 d-md-none">
          <v-btn block outlined dark color="blue" @click="loginWithFacebook"
            ><v-icon left> mdi-facebook </v-icon>FACEBOOK</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3 d-md-none">
          <v-btn
            style="border-color: '#000'"
            block
            dark
            outlined
            color="red"
            @click="loginWithGoogle"
            ><v-icon left> mdi-google </v-icon>GOOGLE</v-btn
          >
        </v-row>
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">หรือ</span>
          <v-divider></v-divider>
        </v-card-text>
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
            this.$store.commit('setLoginType', 'Line')
          })
        } else {
          this.$liff.login()
        }
      } catch (e) {
        console.warn(e)
        this.errorText = 'User cancelled login or did not fully authorize.'
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
        this.$facebook.login((response) => {
          // console.log(response)
          if (response.authResponse) {
            // console.log(response.authResponse.userID)
            // eslint-disable-line
            window.FB.api(
              '/me',
              { fields: ['picture', 'name', 'email'] },
              function (response) {
                // console.log(response)
                letStart(response)
              }
            )
            const letStart = async (obj) => {
              const customer = await this.findCustomersByCustomerCode(obj.id)
              if (customer) {
                this.$store.commit('setCustomerAfterRegister', {
                  ...customer,
                  img: obj.picture.data.url,
                })
                this.$router.push('/detail')
              } else {
                this.$store.commit('setDataAfterLogin', {
                  id: obj.id,
                  name: obj.name,
                  img: obj.picture.data.url,
                  email: obj.email,
                })
                this.$router.push('/form')
              }
              this.$store.commit('setLoginType', 'Facebook')
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
        this.errorText = null
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
        this.$store.commit('setLoginType', 'Google')

        // console.log(googleUser)
      } catch (e) {
        console.error(e)
        this.errorText = 'User cancelled login or did not fully authorize.'
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
