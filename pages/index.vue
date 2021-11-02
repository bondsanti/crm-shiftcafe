<template>
  <div style="height: 100%">
    <Header title="ยินดีต้อนรับ" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="1" md="2" lg="3"></v-col>
      <v-col cols="10" md="8" lg="6" align="center">
        <v-row justify="center">
          <v-avatar color="orange" size="100">
            <img src=" /logo.ico" alt="John" />
          </v-avatar>
        </v-row>
        <v-row justify="center" class="my-3">
          <h3>SHIFT CAFÉ</h3>
        </v-row>
        <v-row justify="center" class="mt-5 pb-2">
          <v-col>
            <v-btn block outlined dark color="primary" @click="noSocial"
              >สมัครสมาชิก</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              block
              outlined
              dark
              color="primary"
              @click="$refs.dl.dialog = true"
              >รายละเอียดสมาชิก</v-btn
            >
          </v-col>
        </v-row>

        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">สมัครสมาชิกหรือดูรายละเอียดด้วย</span>
          <v-divider></v-divider>
        </v-card-text>

        <v-row justify="center" class="hidden-sm-and-down">
          <v-col cols="12" md="4" align="right" class="ma-0 pa-0">
            <v-btn
              id="no-background-border"
              :loading="lineLoading"
              outlined
              dark
              color="primary"
              @click="loginWithLine"
              ><v-icon left> mdi-chat </v-icon>LINE</v-btn
            >
          </v-col>
          <v-col align="center" cols="12" md="4" class="ma-0 pa-0 pr-2">
            <v-btn
              id="no-background-border"
              :loading="facebookLoading"
              outlined
              dark
              color="primary"
              @click="loginWithFacebook"
              ><v-icon left> mdi-facebook </v-icon>FACEBOOK</v-btn
            >
          </v-col>
          <v-col cols="12" md="4" align="left" class="ma-0 pa-0">
            <v-btn
              id="no-background-border"
              :loading="googleLoading"
              outlined
              dark
              color="primary"
              @click="loginWithGoogle"
              ><v-icon left> mdi-google </v-icon>GOOGLE</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center" class="my-3 d-md-none">
          <v-btn
            :loading="lineLoading"
            block
            outlined
            dark
            color="primary"
            @click="loginWithLine"
            ><v-icon left> mdi-chat </v-icon>LINE</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3 d-md-none">
          <v-btn
            :loading="facebookLoading"
            block
            outlined
            dark
            color="primary"
            @click="loginWithFacebook"
            ><v-icon left> mdi-facebook </v-icon>FACEBOOK</v-btn
          >
        </v-row>
        <v-row justify="center" class="my-3 d-md-none">
          <v-btn
            :loading="googleLoading"
            block
            dark
            outlined
            color="primary"
            @click="loginWithGoogle"
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
      <v-col cols="1" md="2" lg="3"></v-col>
    </v-row>
    <Dialog
      ref="dl"
      :error="errorDialog"
      :btn-loading="btnLoading"
      @confirmDialog="goDetail"
    />
  </div>
</template>
<script>
export default {
  middleware: 'getCustomer',
  data() {
    return {
      errorText: null,
      facebookLoading: false,
      googleLoading: false,
      lineLoading: false,
      errorDialog: false,
      btnLoading: false,
    }
  },
  computed: {
    allCustomers() {
      return this.$store.state.allCustomers
    },
  },
  created() {},
  methods: {
    async loginWithLine() {
      try {
        this.lineLoading = true
        this.errorText = null
        await this.$liff.init({ liffId: '1656591886-1kqakNAV' })

        if (this.$liff.isLoggedIn()) {
          // console.log('login')
          this.$liff.getProfile().then(async (res) => {
            // console.log(res)
            const customer = await this.findCustomersByCustomerCode(res.userId)
            // const customer = await this.findCustomersByCustomerCode('57889654')
            // console.log(customer)
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
            this.lineLoading = false
            this.$store.commit('setLoginType', 'Line')
          })
        } else {
          this.$liff.login()
        }
      } catch (e) {
        console.warn(e)
        this.lineLoading = false
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
        this.facebookLoading = true
        this.errorText = null
        await this.$facebook.init({
          appId: '637285820599884',
          status: true,
          xfbml: true,
          version: 'v2.7',
        })
        // console.log(this.$facebook)
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
              this.facebookLoading = false
              this.$store.commit('setLoginType', 'Facebook')
            }
          } else {
            this.facebookLoading = false
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
        this.googleLoading = true
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
        this.googleLoading = false
        // console.log(googleUser)
      } catch (e) {
        console.error(e)
        this.googleLoading = false

        this.errorText = 'User cancelled login or did not fully authorize.'
      }
    },
    noSocial() {
      this.$router.push('/form')
    },
    async goDetail(telephone) {
      // console.log(telephone)
      this.btnLoading = true
      this.errorDialog = false
      const customer = await this.findCustomersByTelephone(telephone)
      if (!customer) {
        this.errorDialog = true
        this.btnLoading = false
      } else {
        this.btnLoading = false
        this.errorDialog = false
        this.$refs.dl.dialog = false
        this.$store.commit('setCustomerAfterRegister', customer)
        this.$router.push('/detail')
      }
      // console.log(customer)
    },
    findCustomersByTelephone(telephone) {
      // console.log(this.allCustomers)
      return new Promise((resolve, reject) => {
        const result = this.allCustomers.find((c) => {
          return c.phone_number === telephone
        })
        setTimeout(() => resolve(result), 1300)
        // resolve(result)
      })
    },
  },
}
</script>
<style scoped>
#no-background-border {
  border: thin solid transparent !important;
}
</style>
