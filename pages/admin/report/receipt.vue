<template>
  <v-row class="ma-3">
    <AdminTable
      title="ใบเสร็จรับเงิน"
      icon="mdi-cash"
      btn
      show-date-input
      second-row
      :headers="headers"
      :items="items2"
      :items-sub-header="itemsSubHeader"
      :loading="loading"
      :btn-select="btnSelect"
      :time="time"
      @getDateRange="getDateRange"
      @filterReceipt="filterReceipt"
      @openDrawer="viewReceiptDetail"
    />
    <AdminReceiptDetail
      ref="receiptDetailNav"
      :receipt-detail="receiptDetail"
    />
  </v-row>
</template>
<script>
import moment from 'moment'
export default {
  middleware: ['requireSignIn', 'refreshData'],
  props: {
    allReceipts: {
      type: Array,
      default: () => [],
    },
    customers: {
      type: Array,
      default: () => [],
    },
    employees: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    headers: [
      {
        text: 'เลขที่ใบเสร็จรับเงิน.',
        align: 'start',
        sortable: false,
        value: 'no',
      },
      {
        text: 'วันที่',
        align: 'start',
        sortable: false,
        value: 'date',
      },
      { text: 'พนักงาน', align: 'start', sortable: false, value: 'employee' },
      { text: 'ลูกค้า', align: 'start', sortable: false, value: 'customer' },
      {
        text: 'ชนิด',
        align: 'start',
        sortable: false,
        value: 'type',
      },
      {
        text: 'รวมทั้งหมด',
        align: 'start',
        sortable: false,
        value: 'total',
      },
    ],
    itemsSubHeader: [
      {
        value: 0,
        text: 'ใบเสร็จรับเงินทั้งหมด',
        icon: 'mdi-receipt',
      },
      {
        value: 0,
        text: 'ยอดขาย',
        icon: 'mdi-cash',
      },

      {
        value: 0,
        text: 'คืนเงิน',
        icon: 'mdi-cash-refund',
      },
      {
        value: 0,
        text: 'ยกเลิก',
        icon: 'mdi-cash-remove',
      },
    ],
    items: [],
    items2: [],
    loading: false,
    btnSelect: 'ใบเสร็จรับเงินทั้งหมด',

    receiptDetail: {
      cancelled_at: null,
      created_at: null,
      customer_id: null,
      dining_option: null,
      employee_id: null,
      line_items: [],
      note: null,
      order: null,
      payments: [],
      points_balance: null,
      points_deducted: null,
      points_earned: null,
      pos_device_id: null,
      receipt_date: null,
      receipt_number: null,
      receipt_type: null,
      refund_for: null,
      source: null,
      store_id: null,
      surcharge: null,
      tip: null,
      total_discount: null,
      total_discounts: [],
      total_money: null,
      total_tax: null,
      total_taxes: null,
      updated_at: null,
    },
    time: {
      start: '2021-11-05',
      end: '2021-11-30',
    },
  }),
  head() {
    return {
      title: 'ใบเสร็จรับเงิน',
    }
  },
  created() {
    if (this.allReceipts.length !== 0) {
      const end = this.allReceipts.length - 1
      this.time.start = moment(this.allReceipts[end].receipt_date).format(
        'YYYY-MM-DD'
      )
      this.time.end = moment(this.allReceipts[0].receipt_date).format(
        'YYYY-MM-DD'
      )
    }
  },
  methods: {
    getDateRange(obj) {
      this.items = []
      this.items2 = []
      this.loading = true
      const { dayList } = obj
      let dates = []
      dayList.reverse().map((d) => {
        const res = this.filterReceiptsByDate(d)
        dates = [...dates, ...res]
        return res
      })
      // หน่วงเวลา
      // console.log(dates)

      setTimeout(() => {
        dates.map((d) => {
          this.makeItRightForTable(d)
          return d
        })
        this.calculate()
        this.loading = false
        this.items2 = this.items
      }, 1200)
    },
    calculate() {
      const sale = this.items.filter((i) => i.type === 'การขาย')
      const refund = this.items.filter((i) => i.type === 'คืนเงิน')
      const cancel = this.items.filter(
        (i) => i.type === 'คืนเงิน ( ยกเลิก )' || i.type === 'การขาย ( ยกเลิก )'
      )

      this.itemsSubHeader[0].value = this.items.length
      this.itemsSubHeader[1].value = sale.length
      this.itemsSubHeader[2].value = refund.length
      this.itemsSubHeader[3].value = cancel.length
    },
    filterReceiptsByDate(date) {
      // console.log(new Date(date))
      const result = this.allReceipts.filter((r) => {
        return (
          new Date(r.receipt_date).getDate() === new Date(date).getDate() &&
          new Date(r.receipt_date).getMonth() === new Date(date).getMonth() &&
          new Date(r.receipt_date).getFullYear() ===
            new Date(date).getFullYear()
        )
      })
      return result
    },
    makeItRightForTable(data) {
      const obj = {
        no: data.receipt_number,
        date: this.$options.filters.dateThWithTime(data.receipt_date),
        employee: this.findEmployee(data.employee_id),
        customer: this.findCustomer(data.customer_id).name,
        type: this.changeTypeWord(data.receipt_type, data.cancelled_at),
        total: this.$options.filters.comma(data.total_money, 2),
        data,
      }
      this.items.push(obj)
    },
    findEmployee(id) {
      const result = this.employees.find((e) => e.id === id)
      if (result) {
        return result.name
      } else {
        return '-'
      }
    },
    findCustomer(id) {
      const result = this.customers.find((c) => c.id === id)
      if (id) {
        return result
      } else {
        return { name: '-' }
      }
    },
    changeTypeWord(type, cancel) {
      // console.log(type, cancel)
      const word = type === 'SALE' ? 'การขาย' : 'คืนเงิน'
      if (cancel) {
        return word + ' ( ยกเลิก )'
      } else {
        return word
      }
    },
    filterReceipt(text) {
      this.loading = true
      this.items2 = []
      this.btnSelect = text
      switch (text) {
        case 'ยอดขาย':
          setTimeout(() => {
            this.items2 = this.items.filter((i) => i.type === 'การขาย')
            this.loading = false
          }, 1000)
          break
        case 'คืนเงิน':
          setTimeout(() => {
            this.items2 = this.items.filter((i) => i.type === 'คืนเงิน')
            this.loading = false
          }, 1000)
          break
        case 'ยกเลิก':
          setTimeout(() => {
            this.items2 = this.items.filter(
              (i) =>
                i.type === 'คืนเงิน ( ยกเลิก )' ||
                i.type === 'การขาย ( ยกเลิก )'
            )
            this.loading = false
          }, 1000)
          break
        default:
          setTimeout(() => {
            this.items2 = this.items
            this.loading = false
          }, 1000)
      }
      // console.log(text)
    },
    viewReceiptDetail(value) {
      const obj = { ...value.data }
      obj.employee_id = this.findEmployee(value.data.employee_id)
      obj.customer_id = value.data.customer_id
        ? this.findCustomer(value.data.customer_id)
        : null
      obj.receipt_type = this.changeTypeWord(
        value.data.receipt_type,
        value.data.cancelled_at
      )
      this.receiptDetail = obj
      this.$refs.receiptDetailNav.drawer = true
      // console.log(value)
    },
  },
}
</script>
