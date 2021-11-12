<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />
    <v-row class="ma-3">
      <AdminTable
        :title="title"
        icon="mdi-account"
        btn
        third-row
        :headers="headers"
        :items="items"
        :loading="loading"
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
      title: 'ผู้ใช้',
      headers: [
        {
          text: 'ชื่อ-นามสกุล',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'อีเมล',
          align: 'start',
          sortable: false,
          value: 'email',
        },
        {
          text: 'ชื่อผู้ใช้',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        {
          text: 'สิทธิ์การเข้าถึง',
          align: 'start',
          sortable: false,
          value: 'role',
        },
        {
          text: 'ดำเนินการ',
          align: 'start',
          sortable: false,
          value: 'actions',
        },
      ],
      items: [],
      loading: false,
      type: 'add',
      form: {
        input: [
          {
            label: 'ชื่อ - นามสกุล',
            value: '',
            icon: 'mdi-code-array',
            rules: [(v) => !!v || 'กรุณากรอกชื่อ - นามสกุล'],
          },
          {
            label: 'อีเมล',
            value: '',
            icon: 'mdi-account',
            rules: [(v) => !!v || 'กรุณากรอกอีเมล'],
          },
          {
            label: 'ชื่อผู้ใช้',
            value: '',
            icon: 'mdi-account',
            rules: [(v) => !!v || 'กรุณากรอกชื่อผู้ใช้'],
          },
          {
            label: 'รหัสผ่าน',
            value: '',
            icon: 'mdi-account',
            rules: [(v) => !!v || 'กรุณากรอกรหัสผ่าน'],
          },
        ],
        select: [],
      },
    }
  },
  head() {
    return {
      title: 'ผู้ใช้งาน',
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
        this.adminData.users.map((c) => {
          this.makeItRightForTable(c)
          return c
        })
        this.loading = false
      }, 1200)
    },
    makeItRightForTable(data) {
      const obj = {
        name: data.name,
        email: data.email,
        username: data.username,
        role: data.role,
        actions: '',
      }

      this.items.push(obj)
      // console.log(data)
    },
    receiveData() {},
    addData() {
      this.type = 'add'
      this.$refs.formData.drawer = true
    },
  },
}
</script>
