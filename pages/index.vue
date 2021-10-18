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
          <v-row>
            <v-btn
              type="submit"
              :disabled="!valid"
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
  data() {
    return {
      lineData: {},
      valid: true,
      customer_code: '',
      fullName: '',
      email: '',
      telephone: '',
      address: '',
      country_code: '',
      provinces: [],
      districts: [],
      subdistricts: [],
      province: '',
      district: '',
      subdistrict: '',
      districtLoad: false,
      districtDisable: true,
      subdistrictLoad: false,
      subdistrictDisable: true,
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
  computed: {},
  mounted() {
    // this.$liff
    //   .init({
    //     liffId: '1656544842-bvKoPqBv',
    //   })
    //   .then(() => {
    //     // console.log('PASS')
    //     if (this.$liff.isLoggedIn()) {
    //       // console.log('login')
    //       this.$liff.getProfile().then((res) => {
    //         this.lineData = res
    //         this.customer_code = res.userId
    //         console.log(res)
    //       })
    //     } else {
    //       // console.log('not login')
    //       this.$liff.login()
    //     }
    //   })
    //   .catch((e) => {
    //     console.warn(e)
    //   })
  },
  created() {
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
          `https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${this.province}`
        )
        .then((res) => {
          // console.log(res.data)
          const districtForselect = res.data.map((p) => {
            const obj = {
              text: p.district,
              value: p.district,
              subdistrict: p.subdistrict,
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
      console.log(this.district)
      const district = this.districts.find((d) => d.value === this.district)
      this.subdistricts = district.subdistrict
      this.subdistrictDisable = false
      this.subdistrictLoad = false
      // console.log(subdistrict)
    },
    saveData() {
      // console.log(this.province, this.district, this.subdistrict)
      // const obj = {
      //   name: this.fullName,
      //   email: this.email,
      //   phone_number: this.telephone,
      //   address: `${this.address} ${this.subdistrict}`,
      //   city: this.district,
      //   region: this.province,
      //   postal_code: this.country_code,
      //   country_code: 'th',
      // }
      const obj = {
        name: 'dev',
        email: 'dev@email.com',
        phone_number: '9876543210',
        address: 'dev',
        city: 'dev',
        region: 'dev',
        postal_code: '52000',
        country_code: 'th',
      }
      console.log(obj)
      /* this.$liff.closeWindow() */

      // this.$axios.setHeader(
      //   'Authorization',
      //   'Bearer 3eb04e3a8baa4887bfaa8ded241543ee'
      // )
      // this.$axios.setToken('3eb04e3a8baa4887bfaa8ded241543ee', 'Bearer')
      // this.$axios
      //   .$get('https://api.loyverse.com/v1.0/customers')
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((e) => {
      //     console.warn(e)
      //   })
    },
  },
}
</script>
<style>
div {
  font-family: 'Mitr', sans-serif;
}

.v-input__control input {
  text-align: center;
}
</style>
