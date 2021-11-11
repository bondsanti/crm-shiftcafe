<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />

    <v-row class="ma-3">
      <AdminTable
        :title="title"
        :headers="headers"
        :items="items"
        :loading="loading"
        icon="mdi-account-tie-voice"
        third-row
        @addData="addData"
        @formActions="manageData"
      />
      <AdminFormData
        ref="formData"
        :input-data="form"
        :type="type"
        :title="title"
        @sendData="receiveData"
      />
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  middleware: ['requireSignIn', 'refreshData'],
  data() {
    return {
      title: 'ตัวแทน',
      headers: [
        {
          text: 'รหัสตัวแทน',
          align: 'start',
          sortable: false,
          value: 'advise_code',
        },
        {
          text: 'ชื่อ-นามสกุล',
          align: 'start',
          sortable: false,
          value: 'full_name',
        },
        {
          text: 'เปอร์เซ็นต์',
          align: 'start',
          sortable: false,
          value: 'percent',
        },
        {
          text: 'สถานะ',
          align: 'start',
          sortable: false,
          value: 'status',
        },
        {
          text: 'ลบ',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      items: [],
      loading: false,
      type: 'add',
      form: {
        input: [
          { label: 'รหัสตัวแทน', value: '', icon: 'mdi-code-array' },
          { label: 'ชื่อ-นามสกุล', value: '', icon: 'mdi-account' },
        ],
        select: [
          {
            label: 'สมาชิกของร้าน',
            value: null,
            icon: 'mdi-account-group',
            items: [],
          },
          {
            label: 'สถานะ',
            value: true,
            icon: 'mdi-code-array',
            items: [
              {
                text: 'เปิด',
                value: true,
              },
              {
                text: 'ปิด',
                value: false,
              },
            ],
          },
        ],
      },
      idForEditAdviser: null,
    }
  },
  head() {
    return {
      title: 'ตัวแทน',
    }
  },

  computed: mapState(['adminData']),
  created() {
    this.getData()
    this.setItemForCustomer()
  },
  methods: {
    getData() {
      this.loading = true
      setTimeout(() => {
        this.adminData.advisers.map((c) => {
          this.makeItRightForTable(c)
          return c
        })
        this.loading = false
      }, 1200)
    },
    makeItRightForTable(data) {
      // console.log(data)
      const obj = {
        id: data.id,
        advise_code: data.advise_code,
        full_name: data.full_name,
        percent: data.percent,
        status: data.status,
        id_customer: data.id_customer,
        actions: '',
      }

      this.items.push(obj)
      // console.log(data)
    },
    setItemForCustomer() {
      const items = [{ text: 'ไม่ได้เป็นสมาชิกของร้าน', value: null }]
      this.adminData.customers.map((c) => {
        items.push({ text: c.name, value: c.id })
        return c
      })
      // console.log(items)
      this.form.select[0].items = items
    },
    initializeForm() {
      this.form.input[0].value = ''
      this.form.input[1].value = ''
      this.form.select[0].value = null
      this.form.select[1].value = true
      this.idForEditAdviser = null
    },
    addData() {
      // console.log('addData')
      this.type = 'add'
      this.initializeForm()
      this.$refs.formData.drawer = true
    },
    manageData(value) {
      // console.log(value)
      this.form.input[0].value = value.data.advise_code
      this.form.input[1].value = value.data.full_name
      this.form.select[0].value = value.data.id_customer
      this.form.select[1].value = value.data.status
      this.idForEditAdviser = value.data.id
      this.type = value.type
      if (this.type === 'edit') {
        this.$refs.formData.drawer = true
      } else {
        // console.log(value.data)
        this.deleteAdvisor()
      }
    },
    receiveData(value) {
      const obj = {
        adviseCode: value.input[0].value,
        fullName: value.input[1].value,
        idCustomer: value.select[0].value,
        status: value.select[1].value,
      }
      if (this.type === 'add') {
        this.createAdviser(obj)
      } else {
        const newObj = { ...obj, id: this.idForEditAdviser, percent: 0 }
        // console.log(newObj)
        this.updateAdviser(newObj)
      }
    },
    async createAdviser(obj) {
      try {
        const res = await this.$axios.$post('/adviser', obj)
        await this.$store.dispatch('fetchAdvisers')
        this.items.push(res)
        this.initializeForm()
        this.$refs.formData.drawer = false
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async updateAdviser(obj) {
      try {
        const index = this.items.findIndex(
          (i) => i.id === this.idForEditAdviser
        )
        const res = await this.$axios.$put('/adviser', obj)
        await this.$store.dispatch('fetchAdvisers')
        this.items[index].advise_code = res.advise_code
        this.items[index].full_name = res.full_name
        this.items[index].percent = res.percent
        this.items[index].status = res.status
        this.items[index].id_customer = res.id_customer

        this.initializeForm()
        this.$refs.formData.drawer = false
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteAdvisor() {
      try {
        const index = this.items.findIndex(
          (i) => i.id === this.idForEditAdviser
        )
        // console.log(this.idForEditAdviser)
        await this.$axios.$delete('/adviser/' + this.idForEditAdviser)
        await this.$store.dispatch('fetchAdvisers')
        this.items.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
