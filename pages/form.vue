<template>
  <div>
    <Header />
    <v-row justify="center" align="center" class="mt-0">
      <v-col align="center">
        <v-avatar color="orange" size="100">
          <img :src="dataAfterLogin.img || '/logo.ico'" alt="John" />
        </v-avatar>
        <h3>{{ dataAfterLogin.name || 'SHIFT CAFÉ' }}</h3>
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
                prepend-inner-icon="mdi-map"
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
                prepend-inner-icon="mdi-map-marker-minus"
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
                prepend-inner-icon="mdi-map-marker-distance"
              ></v-select>
            </v-col>
            <v-col class="ma-0 pa-0 pl-1">
              <Input
                v-model="country_code"
                label="รหัสไปรษณีย์"
                icon="mdi-numeric"
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
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="1" md="3"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: 'getProvince',

  data() {
    return {
      valid: true,
      // customer data
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
  head() {
    return {
      title: 'REGISTER',
    }
  },
  computed: {
    provinces() {
      return this.$store.state.provinces
    },
    dataAfterLogin() {
      return this.$store.state.dataAfterLogin
    },
    customers() {
      return this.$store.state.allCustomers
    },
  },
  created() {
    this.fullName = this.dataAfterLogin.name || ''
    this.email = this.dataAfterLogin.email || ''
    // this.loginWithLine()
  },
  methods: {
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
    findCustomerByTelephone(telephone) {
      // console.log(this.customers)
      return new Promise((resolve, reject) => {
        const result = this.customers.find((c) => c.phone_number === telephone)
        resolve(result)
      })
    },
    async saveData() {
      /* this.$liff.closeWindow() */
      try {
        this.$refs.form.validate()
        this.btnLoad = true
        console.log(this.province, this.district, this.subdistrict)
        const check = await this.findCustomerByTelephone(this.telephone)
        console.log(check)
        if (check) {
          this.errorText =
            'หมายเลขโทรศัพท์นี้ได้สมัครสมาชิกกับทางร้านเรียบร้อยแล้ว'
          this.btnLoad = false
          return
        }
        const obj = {
          name: this.fullName,
          email: this.email,
          phone_number: this.telephone,
          address: `${this.address} ${this.subdistrict}`,
          city: this.district,
          region: this.province,
          customer_code: this.dataAfterLogin.id || null,
          postal_code: this.country_code,
          country_code: 'th',
        }
        // console.log(obj)
        this.$axios.setHeader(
          'Authorization',
          `Bearer ${this.$nuxt.context.env.loyverseToken}`
        )

        const res = await this.$axios.$post(
          'https://cors-anywhere.herokuapp.com/https://api.loyverse.com/v1.0/customers/',
          obj
        )
        this.$store.commit('setCustomerAfterRegister', {
          ...res,
          img: this.dataAfterLogin.img || null,
        })
        this.$router.push('/success')
        this.btnLoad = false
      } catch (e) {
        console.error(e)
        console.error(e.message)
        console.error(e.response)
        this.btnLoad = false
        this.errorText = e.response.data.errors[0].details || e.message
      }
    },
  },
}
</script>
<style scoped>
.v-input__control input {
  text-align: center;
}
</style>
