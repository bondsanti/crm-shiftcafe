<template>
  <v-row no-gutters>
    <v-dialog
      v-model="dialog"
      width="100%"
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-row class="ma-0">
        <v-col style="background-color: #000; border: 5px solid black">
          <v-row justify="center" class="my-2"
            ><h3 class="white--text">
              {{ head }}{{ otp.request ? ' ' + minutes + ' : ' + seconds : '' }}
            </h3></v-row
          >
          <v-row style="background-color: #fff" justify="center">
            <v-form
              v-show="!otp.request"
              ref="form"
              v-model="valid"
              style="width: 100%"
              @submit.prevent="requestOTP"
            >
              <v-col align="center">
                <Input
                  v-model="telephone"
                  label="หมายเลขโทรศัพท์"
                  class="mt-3"
                  icon="mdi-cellphone"
                  :rules="telephoneRules"
                />

                <v-btn
                  type="submit"
                  :disabled="!valid"
                  :loading="btnLoading"
                  rounded
                  block
                  color="primary"
                  >ขอรหัส OTP</v-btn
                >
              </v-col>
            </v-form>
            <v-form
              v-show="otp.request"
              ref="form"
              v-model="valid2"
              style="width: 100%"
              @submit.prevent="compareOTP"
            >
              <v-col align="center">
                <v-text-field
                  v-model="otpCode"
                  label="รหัส OTP"
                  filled
                  rounded
                  append-icon="mdi-refresh-circle"
                  :rules="otpRules"
                >
                  <template #append>
                    <v-btn
                      :loading="requestOtpAgainLoading"
                      :disabled="timerForOTP !== 0"
                      small
                      icon
                      class="ma-0 pa-0"
                      @click="requestOtpAgain"
                    >
                      <v-icon> mdi-refresh-circle </v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
                <v-row>
                  <v-col>
                    <v-btn
                      rounded
                      block
                      color="primary"
                      @click="changePhoneNumber"
                      >เปลี่ยนหมายเลขโทรศัพท์</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      type="submit"
                      :disabled="!valid2"
                      :loading="btnLoading"
                      rounded
                      block
                      color="primary"
                      >ยืนยัน</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-form>
          </v-row>
          <v-row
            v-show="error.status"
            class="py-2"
            justify="center"
            style="background-color: red"
            ><h3 class="white--text">
              <v-icon dark>mdi-alert</v-icon> {{ error.message }}
            </h3></v-row
          >
        </v-col>
      </v-row>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    // error: {
    //   type: Boolean,
    //   default: false,
    // },
    // btnLoading: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      valid: true,
      valid2: true,
      dialog: false,
      telephone: '',
      otpCode: '',
      telephoneRules: [
        (v) => !!v || 'กรุณากรอกหมายเลขโทรศัพท์',
        (v) => v.length === 10 || 'หมายเลขโทรศัพท์ไม่ถูกต้อง',
        (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
      otpRules: [
        (v) => !!v || 'กรุณากรอกหมายเลข OTP',
        (v) => v.length === 6 || 'หมายเลข OTP ไม่ถูกต้อง',
        (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
      btnLoading: false,
      error: {
        status: false,
        message: '',
      },
      otp: {
        request: false,
        token: null,
      },
      timerForOTP: 0,
      minutes: 0,
      seconds: 0,
      head: 'กรุณากรอกหมายเลขโทรศัพท์',
      requestOtpAgainLoading: false,
    }
  },
  computed: {
    allCustomers() {
      return this.$store.state.allCustomers
    },
  },
  watch: {
    // ไว้ดูการเปลี่ยนแปลงของเวลา
    timerForOTP: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerForOTP--
            const minutesInScope = parseInt(this.timerForOTP / 60, 10)
            const secondsInScope = parseInt(this.timerForOTP % 60, 10)

            this.minutes =
              minutesInScope < 10 ? '0' + minutesInScope : minutesInScope
            this.seconds =
              secondsInScope < 10 ? '0' + secondsInScope : secondsInScope
          }, 1000)
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  methods: {
    async requestOTP() {
      this.btnLoading = true
      // this.otp.request = true
      const result = await this.findCustomersByTelephone(this.telephone)
      if (!result) {
        this.error.status = true
        this.error.message = 'ไม่มีหมายเลขนี้ในระบบ'
      } else {
        this.$axios
          .$post('/otp/request', { phoneNumber: this.telephone })
          .then((res) => {
            // console.log(res)
            this.error.status = false
            this.timerForOTP = 3600
            this.otp.request = true
            this.otp.token = res.token
            this.head = `กรุณากรอกหมายเลข OTP`
          })
          .catch((e) => {
            this.error.status = true
            this.error.message = 'ส่ง OTP ไม่สำเร็จ'
          })
      }

      this.btnLoading = false
    },
    requestOtpAgain() {
      this.requestOtpAgainLoading = true
      this.$axios
        .$post('/otp/request', { phoneNumber: this.telephone })
        .then((res) => {
          // console.log(res)
          this.error.status = false
          this.timerForOTP = 3600
          this.otp.request = true
          this.otp.token = res.token
          this.head = `กรุณากรอกหมายเลข OTP`
          this.requestOtpAgainLoading = false
        })
        .catch((e) => {
          this.timerForOTP = 0
          this.error.status = true
          this.error.message = 'ส่ง OTP ไม่สำเร็จ'
          this.requestOtpAgainLoading = false
        })
    },
    compareOTP() {
      this.btnLoading = true

      this.$axios
        .$post('/otp/compare', {
          otpToken: this.otp.token,
          otpCode: this.otpCode,
        })
        .then((res) => {
          setTimeout(() => {
            this.$emit('confirmDialog', this.telephone)
            this.head = `เข้าสู่ระบบสำเร็จ`
            this.btnLoading = false
          }, 1300)
        })
        .catch((e) => {
          this.error.status = true
          this.error.message = 'รหัส OTP ไม่ถูก้อง'
          this.btnLoading = false
        })
    },
    findCustomersByTelephone(telephone) {
      return new Promise((resolve, reject) => {
        const result = this.allCustomers.find((c) => {
          return c.phone_number === telephone
        })

        setTimeout(() => resolve(result), 1300)
        // resolve(result)
      })
    },
    changePhoneNumber() {
      this.error.status = false
      this.btnLoading = false
      this.otp.request = false
      this.otp.token = null
      this.timerForOTP = 0
      this.head = `กรุณากรอกหมายเลขโทรศัพท์`
    },
  },
}
</script>
<style scoped>
.v-dialog__content {
  align-items: flex-center;
  justify-content: flex-center;
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .v-dialog__content {
    align-items: flex-end;
    justify-content: flex-center;
  }
}
</style>
