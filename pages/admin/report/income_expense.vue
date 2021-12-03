<template>
  <v-row class="ma-3">
    <AdminTable
      :title="title"
      icon="mdi-account-cash"
      show-date-input
      third-row
      :headers="headers"
      :items="items"
      :loading="loading"
      :time="time"
      :disable-add-button="!auth.user.role.includes('add-income-expense')"
      @getDateRange="getData"
      @addData="addData"
      @formActions="manageData"
    />
    <AdminFormData
      ref="formData"
      :input-data="form"
      :type="type"
      :title="title"
      show-date
      show-detail
      @sendData="receiveData"
    />
    <Alert ref="alert" :title="titleAlert" />
    <ConfirmDialog
      ref="confirmDialog"
      :title="titleConfirm"
      @confirm="deleteIncomeExpense"
    />
  </v-row>
</template>
<script>
import moment from 'moment'
export default {
  middleware: ['requireSignIn', 'refreshData'],
  transition: 'home',
  data() {
    return {
      title: 'รายรับ-รายจ่าย',
      headers: [
        {
          text: 'วันที่',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        {
          text: 'รายรับ',
          align: 'start',
          sortable: false,
          value: 'income',
        },
        {
          text: 'รายจ่าย',
          align: 'start',
          sortable: false,
          value: 'expense',
        },
        {
          text: 'รายละเอียดรายจ่าย',
          align: 'start',
          sortable: false,
          value: 'expenseDetail',
        },
        {
          text: 'คงเหลือ',
          align: 'start',
          sortable: false,
          value: 'balance',
        },
        {
          text: 'กระบวนการ',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      items: [],
      type: 'add',
      loading: false,
      time: {
        start: moment(),
        end: moment(),
      },
      interval: null,
      form: {
        input: [
          {
            label: 'รายรับ',
            value: '',
            icon: 'mdi-cash-plus',
            rules: [(v) => !!v || 'กรุณากรอกรายรับ'],
          },
          {
            label: 'รายจ่าย',
            value: '',
            icon: 'mdi-cash-minus',
            rules: [(v) => !!v || 'กรุณากรอกรายจ่าย'],
          },
        ],
        select: [],
      },
      titleAlert: '',
      idForEdit: null,
      titleConfirm: '',
    }
  },
  head() {
    return {
      title: 'รายรับ-รายจ่าย',
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
    // console.log(this.adminData.incomeExpense)
    if (this.adminData.incomeExpense.length !== 0) {
      const end = this.adminData.incomeExpense.length - 1
      this.time.start = moment(this.adminData.incomeExpense[0].date).format(
        'YYYY-MM-DD'
      )
      this.time.end = moment(this.adminData.incomeExpense[end].date).format(
        'YYYY-MM-DD'
      )
    }
    // this.filterReceipts()
  },
  beforeDestroy() {
    clearTimeout(this.interval)
  },
  methods: {
    getData(obj) {
      this.loading = true
      this.items = []
      const { dayList } = obj
      let data = []
      dayList.reverse().map((d) => {
        const res = this.filterIncomeExpenseByDate(d)
        data = [...data, ...res]
        return res
      })
      // console.log(data)
      this.interval = setTimeout(() => {
        data.map((d) => this.makeItRightForTable(d))
        this.loading = false
      }, 1000)
    },
    filterIncomeExpenseByDate(date) {
      // console.log(new Date(date))
      const result = this.adminData.incomeExpense.filter((r) => {
        return (
          new Date(r.date).getDate() === new Date(date).getDate() &&
          new Date(r.date).getMonth() === new Date(date).getMonth() &&
          new Date(r.date).getFullYear() === new Date(date).getFullYear()
        )
      })
      return result
    },
    initialForm() {
      this.idForEdit = null
      this.form.input[0].value = ''
      this.form.input[1].value = ''
      this.$refs.formData.date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)
      this.$refs.formData.detail = ''
    },
    makeItRightForTable(value) {
      this.items.push({
        ...value,
        disableEdit: !this.auth.user.role.includes('edit-income-expense'),
        disableDelete: !this.auth.user.role.includes('delete-income-expense'),
      })
    },
    receiveData(value) {
      // console.log(this.type)
      const obj = {
        date: value.date,
        income: value.input[0].value,
        expense: value.input[1].value,
        balance: value.input[0].value - value.input[1].value,
        expenseDetail: value.detail,
      }
      if (this.type === 'add') {
        this.createIncomeExpense(obj)
      } else if (this.type === 'edit') {
        this.updateIncomeExpense(obj)
      }
    },
    manageData(obj) {
      // console.log(obj)
      this.type = obj.type
      this.idForEdit = obj.data.id
      if (obj.type === 'edit') {
        this.form.input[0].value = obj.data.income
        this.form.input[1].value = obj.data.expense
        this.$refs.formData.date = obj.data.date
        this.$refs.formData.detail = obj.data.expenseDetail
        this.$refs.formData.drawer = true
      } else if (obj.type === 'delete') {
        this.titleConfirm = 'คุณต้องการลบรายรับ-รายจ่ายหรือไม่ ?'
        this.$refs.confirmDialog.dialog = true
      }
    },
    addData() {
      this.type = 'add'
      this.initialForm()
      this.$refs.formData.drawer = true
    },
    showAlert(msg) {
      this.titleAlert = msg
      this.$refs.alert.dialog = true
      this.interval = setTimeout(() => {
        this.$refs.alert.dialog = false
      }, 1500)
    },
    async createIncomeExpense(obj) {
      // console.log(obj)
      try {
        const check = this.auth.user.role.includes('add-income-expense')
        if (!check) {
          this.throwError('คุณไม่มีสิทธิ์เพิ่มข้อมูลรายรับ-รายจ่าย', 401)
        }
        const res = await this.$axios.$post('/income-expense', obj)
        await this.$store.dispatch('fetchIncomeExpense')

        this.items.unshift({
          ...res,
          disableEdit: !this.auth.user.role.includes('edit-income-expense'),
          disableDelete: !this.auth.user.role.includes('delete-income-expense'),
        })
        this.initialForm()
        this.$refs.formData.drawer = false
        this.showAlert('เพิ่มข้อมูลรายรับ-รายจ่ายสำเร็จ')
      } catch (e) {
        console.log(e)
      }
    },
    async updateIncomeExpense(obj) {
      // console.log(obj)
      try {
        const check = this.auth.user.role.includes('edit-income-expense')
        if (!check) {
          this.throwError('คุณไม่มีสิทธิ์แก้ไขข้อมูลรายรับ-รายจ่าย', 401)
        }
        const index = this.items.findIndex((i) => i.id === this.idForEdit)
        const res = await this.$axios.$put(
          '/income-expense/' + this.idForEdit,
          obj
        )
        await this.$store.dispatch('fetchIncomeExpense')

        this.items[index].date = res.date
        this.items[index].income = res.income
        this.items[index].expense = res.expense
        this.items[index].expenseDetail = res.expenseDetail
        this.items[index].balance = res.balance
        this.initialForm()
        this.$refs.formData.drawer = false
        this.showAlert('แก้ไขข้อมูลรายรับ-รายจ่ายสำเร็จ')
      } catch (e) {
        console.log(e)
      }
    },
    async deleteIncomeExpense() {
      try {
        const check = this.auth.user.role.includes('delete-income-expense')
        if (!check) {
          this.throwError('คุณไม่มีสิทธิ์ลบข้อมูลรายรับ-รายจ่าย', 401)
        }
        const index = this.items.findIndex((i) => i.id === this.idForEdit)
        await this.$axios.$delete('/income-expense/' + this.idForEdit)
        await this.$store.dispatch('fetchIncomeExpense')
        this.items.splice(index, 1)
        this.initialForm()
        this.$refs.confirmDialog.dialog = false
        this.showAlert('ลบข้อมูลรายรับ-รายจ่ายสำเร็จ')
      } catch (e) {
        console.log(e)
      }
    },
    throwError(msg, code) {
      const error = new Error(msg)
      error.statusCode = code

      throw error
    },
  },
}
</script>
