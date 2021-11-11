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
          value: 'adviseCode',
        },
        {
          text: 'ชื่อ-นามสกุล',
          align: 'start',
          sortable: false,
          value: 'fullName',
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
            label: 'สถานะ',
            value: '',
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
    }
  },
  head() {
    return {
      title: 'ตัวแทน',
    }
  },
  computed: {
    adminData() {
      return this.$store.state.adminData
    },
  },
  created() {
    this.getData()
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
      const obj = {
        adviseCode: data.advise_code,
        fullName: data.full_name,
        percent: data.percent,
        status: data.status,
      }

      this.items.push(obj)
      // console.log(data)
    },
    addData() {
      console.log('addData')
      this.$refs.formData.drawer = true
    },
    receiveData(value) {
      const obj = {
        advise_code: value.input[0].value,
        full_name: value.input[1].value,
        status: value.select[0].value,
      }
      console.log(obj)
    },
  },
}
</script>
