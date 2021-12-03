<template>
  <div>
    <v-row class="ma-3">
      <AdminTable
        :title="title"
        icon="mdi-account"
        btn
        third-row
        :disable-add-button="!auth.user.role.includes('add-user')"
        :headers="headers"
        :items="items"
        :loading="loading"
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
    <ConfirmDialog
      ref="confirmDialog"
      :title="titleConfirm"
      @confirm="deleteUser"
    />
    <Alert ref="alert" :title="titleAlert" />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['requireSignIn', 'refreshData'],
  validate({ store }) {
    const { user } = store.state.auth
    // console.log(user)
    const result = user.role.includes('user')
    if (!result) {
      const error = new Error(
        `คุณไม่มีสิทธิ์เข้าถึงส่วนของผู้ใช้ โปรดติดต่อผู้ดูแลระบบ`
      )
      error.statusCode = 401

      throw error
    }

    return user.role.includes('user')
  },
  transition: 'home',
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
            icon: 'mdi-card-account-details',
            rules: [(v) => !!v || 'กรุณากรอกชื่อ - นามสกุล'],
          },
          {
            label: 'อีเมล',
            value: '',
            icon: 'mdi-email',
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
            icon: 'mdi-form-textbox-password',
            rules: [(v) => !!v || 'กรุณากรอกรหัสผ่าน'],
          },
        ],
        select: [
          {
            label: 'ตัวแทน',
            value: null,
            icon: 'mdi-account-tie-voice',
            items: [
              {
                text: 'ไม่ได้เป็นตัวแทน',
                value: null,
              },
            ],
            multiple: false,
          },
          {
            label: 'สิทธิ์การเข้าถึง',
            value: ['report'],
            icon: 'mdi-code-array',
            items: [
              {
                text: 'ดูข้อมูลรายงาน',
                value: 'report',
              },
              {
                text: 'ดูข้อมูลรายการสินค้า',
                value: 'item',
              },
              {
                text: 'ดูข้อมูลลูกค้า',
                value: 'customer',
              },
              {
                text: 'ดูข้อมูลตัวแทน',
                value: 'adviser',
              },
              {
                text: 'เพิ่มข้อมูลตัวแทน',
                value: 'add-adviser',
              },
              {
                text: 'ดูข้อมูลลูกค้าของตัวแทนคนอื่น',
                value: 'customer-under-another-advise',
              },
              {
                text: 'แก้ไขข้อมูลตัวแทน',
                value: 'edit-adviser',
              },
              {
                text: 'ลบข้อมูลตัวแทน',
                value: 'delete-adviser',
              },
              {
                text: 'ดูข้อมูลผู้ใช้',
                value: 'user',
              },
              {
                text: 'เพิ่มข้อมูลผู้ใช้',
                value: 'add-user',
              },
              {
                text: 'แก้ไขข้อมูลผู้ใช้',
                value: 'edit-user',
              },
              {
                text: 'ลบข้อมูลผู้ใช้',
                value: 'delete-user',
              },
              {
                text: 'เพิ่มข้อมูลรายรับ-รายจ่าย',
                value: 'add-income-expense',
              },
              {
                text: 'แก้ไขข้อมูลรายรับ-รายจ่าย',
                value: 'edit-income-expense',
              },
              {
                text: 'ลบข้อมูลรายรับ-รายจ่าย',
                value: 'delete-income-expense',
              },
            ],
            multiple: true,
          },
        ],
      },
      idForEditUser: null,
      titleConfirm: 'คุณต้องการลบหรือไม่',
      titleAlert: 'คุณต้องการลบหรือไม่',
      timeout: null,
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
    auth() {
      return this.$store.state.auth
    },
  },
  created() {
    this.getData()
    this.setItemForAdviseSelect()
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    getData() {
      this.loading = true
      const filterUser = this.adminData.users.filter(
        (a) => a.username !== 'super_admin'
      )
      this.timeout = setTimeout(() => {
        filterUser.map((c) => {
          this.makeItRightForTable(c)
          return c
        })
        this.loading = false
      }, 1200)
    },
    makeItRightForTable(data) {
      const obj = {
        id: data.id,
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        userAffiliate: data.userAffiliate,
        role: data.role,
        disableEdit: !this.auth.user.role.includes('edit-user'),
        disableDelete: !this.auth.user.role.includes('delete-user'),
        actions: '',
      }

      this.items.push(obj)
      // console.log(data)
    },
    initializeForm() {
      this.form.input[0].value = ''
      this.form.input[1].value = ''
      this.form.input[2].value = ''
      this.form.input[3].value = ''
      this.form.select[0].value = null
      this.form.select[1].value = ['report']
      this.idForEditUser = null
    },
    receiveData(value) {
      const obj = {
        name: value.input[0].value,
        email: value.input[1].value,
        username: value.input[2].value,
        password: value.input[3].value,
        userAffiliate: value.select[0].value,
        role: value.select[1].value,
      }
      // console.log(obj)
      if (this.type === 'add') {
        const check = this.auth.user.role.includes('add-user')
        if (!check) {
          this.throwError('คุณไม่มีสิทธิ์เพิ่มข้อมูลผู้ใช้', 401)
        }
        this.createUser(obj)
      } else {
        const check = this.auth.user.role.includes('edit-user')
        if (!check) {
          this.throwError('คุณไม่มีสิทธิ์แก้ไขข้อมูลผู้ใช้', 401)
        }
        const objForUpdate = { ...obj, id: this.idForEditUser }
        this.updateUser(objForUpdate)
      }
    },
    addData() {
      const check = this.auth.user.role.includes('add-user')
      if (!check) {
        this.throwError('คุณไม่มีสิทธิ์เพิ่มข้อมูลผู้ใช้', 401)
      }
      this.initializeForm()
      this.type = 'add'
      this.$refs.formData.drawer = true
    },

    manageData(value) {
      // console.log(value)
      this.form.input[0].value = value.data.name
      this.form.input[1].value = value.data.email
      this.form.input[2].value = value.data.username
      this.form.input[3].value = value.data.password
      this.form.select[0].value = value.data.userAffiliate
      this.form.select[1].value = value.data.role
      this.idForEditUser = value.data.id
      this.type = value.type
      if (this.type === 'edit') {
        const check = this.auth.user.role.includes('edit-user')
        if (!check) {
          this.throwError('คุณไม่มีสิทธิ์แก้ไขข้อมูลผู้ใช้', 401)
        }
        this.$refs.formData.drawer = true
      } else {
        const check = this.auth.user.role.includes('delete-user')
        if (!check) {
          this.throwError('คุณไม่มีสิทธิ์ลบข้อมูลผู้ใช้', 401)
        }
        this.titleConfirm = `คุณต้องการลบ ${value.data.name} หรือไม่ ?`
        this.$refs.confirmDialog.dialog = true
      }
    },
    async createUser(obj) {
      try {
        const res = await this.$axios.$post('/user', obj)
        await this.$store.dispatch('fetchUsers')
        this.showAlert('เพิ่มข้อมูลผู้ใช้สำเร็จ')
        this.items.push({
          ...res,
          disableEdit: !this.auth.user.role.includes('edit-user'),
          disableDelete: !this.auth.user.role.includes('delete-user'),
        })
        this.initializeForm()
        this.$refs.formData.drawer = false
      } catch (e) {
        // console.log(e.response.data)
        console.log(e)
        this.showAlert(e.response.data.error.message)
      }
    },
    async updateUser(obj) {
      try {
        const index = this.items.findIndex((i) => i.id === this.idForEditUser)

        const res = await this.$axios.$put('/user', obj)
        await this.$store.dispatch('fetchUsers')
        this.showAlert('แก้ไขข้อมูลผู้ใช้สำเร็จ')
        this.items[index].name = res.name
        this.items[index].email = res.email
        this.items[index].username = res.username
        this.items[index].password = res.password
        this.items[index].userAffiliate = res.userAffiliate
        this.items[index].role = res.role
        this.initializeForm()
        this.$refs.formData.drawer = false
      } catch (e) {
        console.log(e)
        this.showAlert(e.response.data.error.message)
      }
    },
    async deleteUser() {
      try {
        const index = this.items.findIndex((i) => i.id === this.idForEditUser)
        await this.$axios.$delete('/user/' + this.idForEditUser)
        await this.$store.dispatch('fetchUsers')
        this.items.splice(index, 1)
        this.$refs.confirmDialog.dialog = false
        this.showAlert('ลบข้อมูลผู้ใช้สำเร็จ')
      } catch (e) {
        console.log(e)
        this.showAlert(e.response.data.error.message)
      }
    },
    throwError(msg, code) {
      const error = new Error(msg)
      error.statusCode = code

      throw error
    },
    showAlert(msg) {
      this.titleAlert = msg
      this.$refs.alert.dialog = true
      this.timeout = setTimeout(() => {
        this.$refs.alert.dialog = false
      }, 1500)
    },
    setItemForAdviseSelect() {
      // console.log(this.adminData)
      this.adminData.advisers.map((a) => {
        this.form.select[0].items.push({ text: a.full_name, value: a.id })
        return 0
      })
    },
  },
}
</script>
