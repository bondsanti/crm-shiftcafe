<template>
  <div>
    <Header />
    <v-row justify="center" align="center" class="mt-0">
      <v-col align="center">
        <v-avatar color="orange" size="100">
          <img :src="lineData.pictureUrl || '/logo.ico'" alt="John" />
        </v-avatar>
        <h3>{{ lineData.displayName || 'SHIFT CAFÉ' }}</h3>
      </v-col>
    </v-row>
    <v-row class="mb-2">
      <v-col cols="1" md="3"></v-col>
      <v-col cols="10" align="center" md="6">
        <v-form ref="form" v-model="valid" @submit.prevent="saveData">
          <v-row>
            <Input
              v-model="fullName"
              label="ชื่อ-นามสกุล"
              icon="mdi-account"
              :rules="checkValidate('ชื่อ-นามสกุล')"
            />
          </v-row>
          <v-row>
            <Input
              v-model="email"
              type="email"
              label="อีเมลล์"
              icon="mdi-email"
              :rules="emailRules"
            />
          </v-row>
          <v-row>
            <Input
              v-model="telephone"
              label="เบอร์โทรศัพท์"
              icon="mdi-cellphone"
              :rules="telephoneRules"
            />
          </v-row>
          <v-row>
            <Input
              v-model="address"
              label="ที่อยู่"
              icon="mdi-map-marker"
              :rules="checkValidate('ที่อยู่')"
            />
          </v-row>
          <v-row>
            <v-col class="ma-0 pa-0 pr-1">
              <v-select
                v-model="province"
                label="จังหวัด"
                :items="provinces"
                :rules="checkValidate('จังหวัด')"
                dense
                filled
                rounded
                prepend-inner-icon="mdi-island"
                @change="selectProvince"
              ></v-select>
            </v-col>
            <v-col class="ma-0 pa-0 pl-1">
              <!-- <Select label="อำเภอ" icon="mdi-subway-variant" /> -->
              <v-select
                v-model="district"
                :loading="districtLoad"
                loader-height="5"
                :disabled="districtDisable"
                label="อำเภอ"
                :items="districts"
                :rules="checkValidate('อำเภอ')"
                dense
                filled
                rounded
                prepend-inner-icon="mdi-subway-variant"
                @change="getSubdistrict"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="ma-0 pa-0 pr-1">
              <!-- <Select label="ตำบล" icon="mdi-elephant" /> -->
              <v-select
                v-model="subdistrict"
                label="ตำบล"
                :loading="subdistrictLoad"
                loader-height="5"
                :disabled="subdistrictDisable"
                :items="subdistricts"
                :rules="checkValidate('ตำบล')"
                dense
                filled
                rounded
                prepend-inner-icon="mdi-elephant"
              ></v-select>
            </v-col>
            <v-col class="ma-0 pa-0 pl-1">
              <Input
                v-model="country_code"
                label="รหัสไปรษณีย์"
                icon="mdi-qrcode-edit"
                :rules="countryCodeRules"
              />
            </v-col>
          </v-row>
          <v-row v-show="errorText">
            <v-alert
              width="100%"
              color="error"
              dark
              icon="mdi-alert"
              border="left"
              prominent
            >
              {{ errorText }}
            </v-alert>
          </v-row>
          <v-row>
            <v-btn
              type="submit"
              :disabled="!valid"
              :loading="btnLoad"
              x-large
              block
              color="primary"
              rounded
              >บันทึก</v-btn
            >
            <!-- <v-btn
              type="submit"
              x-large
              block
              color="primary"
              rounded
              :loading="btnLoad"
              >บันทึก</v-btn
            > -->
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="1" md="3"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: 'checkCustomer',
  data() {
    return {
      lineData: {},
      valid: true,
      // customer data
      customer_code: null,
      fullName: '',
      email: '',
      telephone: '',
      address: '',
      country_code: '',
      province: '',
      district: '',
      subdistrict: '',
      // -----------------------
      errorText: null,
      provinces: [],
      districts: [],
      subdistricts: [],
      districtLoad: false,
      districtDisable: true,
      subdistrictLoad: false,
      subdistrictDisable: true,
      btnLoad: false,
      emailRules: [
        (v) => !!v || 'กรุณากรอกอีเมลล์',
        (v) => /.+@.+\..+/.test(v) || 'อีเมลล์ไม่ถูกต้อง',
      ],
      telephoneRules: [
        (v) => !!v || 'กรุณากรอกเบอร์โทรศัพท์',
        (v) => v.length === 10 || 'เบอร์โทรศัพท์ไม่ถูกต้อง',
        (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
      countryCodeRules: [
        (v) => !!v || 'กรุณากรอกรหัสไปรษณีย์',
        (v) => v.length === 5 || 'รหัสไปรษณีย์ไม่ถูกต้อง',
        (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
    }
  },
  computed: {
    allCustomers() {
      return this.$store.state.allCustomers
    },
  },
  created() {
    this.getAllCustomerFromLoyverse()
    this.loginWithLine()
    // this.getProvinces()
  },
  methods: {
    async loginWithLine() {
      try {
        await this.$liff.init({ liffId: '1656544842-bvKoPqBv' })

        if (this.$liff.isLoggedIn()) {
          // console.log('login')
          this.$liff.getProfile().then(async (res) => {
            const customer = await this.findCustomersByCustomerCode(res.userId)

            if (customer) {
              console.log(customer)
              this.$store.commit('setCustomerAfterRegister', customer)
              this.$router.push('/detail')
            }
            this.getProvinces()
            this.lineData = res
            this.customer_code = res.userId
            // console.log(res)
          })
        } else {
          // console.log('not login')
          this.$liff.login()
        }
      } catch (e) {
        console.warn(e)
      }
    },
    findCustomersByCustomerCode(customerCode) {
      return new Promise((resolve, reject) => {
        const result = this.allCustomers.find((c) => {
          return c.customer_code === customerCode
        })
        resolve(result)
      })
    },
    getAllCustomerFromLoyverse() {
      this.$axios.setHeader(
        'Authorization',
        `Bearer ${this.$nuxt.context.env.loyverseToken}`
      )
      this.$axios
        .$get(
          'https://cors-anywhere.herokuapp.com/https://api.loyverse.com/v1.0/customers/'
        )
        .then((res) => {
          this.$store.commit('setAllCustomers', res.customers)
          // console.log(res)
        })
    },
    getProvinces() {
      this.$axios
        .$get(
          'https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces'
        )
        .then((res) => {
          // console.log(res.data)
          const provincesForselect = res.data.map((p) => {
            const obj = { text: p.province, value: p.province }
            return obj
          })
          // console.log(provincesForselect)
          this.provinces = provincesForselect
        })
    },
    checkValidate(name) {
      return [(v) => !!v || `กรุณากรอก${name}`]
    },
    selectProvince() {
      console.log(this.province)
      this.selectDistrict()
    },
    selectDistrict() {
      this.districtLoad = true
      this.$axios
        .$get(
          `https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${this.province}/district`
        )
        .then((res) => {
          // console.log(res.data)
          const districtForselect = res.data.map((p) => {
            const obj = {
              text: p,
              value: p,
            }
            return obj
          })
          // console.log(districtForselect)
          this.districts = districtForselect
          this.districtLoad = false
          this.districtDisable = false
        })
    },
    getSubdistrict() {
      this.subdistrictLoad = true
      // console.log(this.district)
      this.$axios
        .$get(
          `https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${this.province}/district/${this.district}`
        )
        .then((res) => {
          // console.log(res)
          const subdistricts = res.data.map((s) => {
            const obj = {
              text: s,
              value: s,
            }
            return obj
          })
          this.subdistricts = subdistricts
          this.subdistrictDisable = false
          this.subdistrictLoad = false
        })
      // const district = this.districts.find((d) => d.value === this.district)
    },
    saveData() {
      this.$refs.form.validate()
      this.btnLoad = true
      console.log(this.province, this.district, this.subdistrict)
      const obj = {
        name: this.fullName,
        email: this.email,
        phone_number: this.telephone,
        address: `${this.address} ${this.subdistrict}`,
        city: this.district,
        region: this.province,
        customer_code: this.customer_code,
        postal_code: this.country_code,
        country_code: 'th',
      }

      /* this.$liff.closeWindow() */

      this.$axios.setHeader(
        'Authorization',
        `Bearer ${this.$nuxt.context.env.loyverseToken}`
      )

      this.$axios
        .$post(
          'https://cors-anywhere.herokuapp.com/https://api.loyverse.com/v1.0/customers/',
          obj
        )
        .then((res) => {
          this.$store.commit('setCustomerAfterRegister', res)
          this.$router.push('/success')
          this.btnLoad = false
        })
        .catch((e) => {
          this.btnLoad = false
          this.errorText = e.response.data.errors[0].details
          console.warn(e.response.data.errors)
          console.warn(e)
        })
    },
  },
}
</script>
<style>
.v-input__control input {
  text-align: center;
}
</style>
