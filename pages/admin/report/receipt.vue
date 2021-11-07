<template>
  <v-row class="ma-3">
    <AdminTable
      title="ใบเสร็จรับเงิน"
      icon="mdi-cash"
      btn
      :headers="headers"
      :items="items2"
      :items-sub-header="itemsSubHeader"
      :loading="loading"
      :btn-select="btnSelect"
      @getDateRange="getDateRange"
      @filterReceipt="filterReceipt"
      @openDrawer="drawer = true"
    />

    <v-navigation-drawer
      v-model="drawer"
      app
      bottom
      temporary
      right
      width="350"
      fixed
    >
      <v-container>
        <v-row justify="center">
          <v-col class="ma-3">
            <v-row justify="end"> คืนเงิน </v-row>
            <v-row justify="center">
              <v-col cols="12" align="center" class="ma-0 pa-0">
                <h1>50.00 บาท</h1>
              </v-col>
              <h3>รวมทั้งหมด</h3>
            </v-row>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="12">
            <p class="pa-0 ma-0">รายการออเดอร์ #1107-01-11</p>
            <p class="pa-0 ma-0">รายการออเดอร์ #1107-01-11</p>
            <p class="pa-0 ma-0">รายการออเดอร์ #1107-01-11</p>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col>
            <h2>เสิร์ฟในร้าน</h2>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col class="ma-4">
            <v-row v-for="i in 3" :key="i">
              <v-col cols="6" class="ma-0 pa-0">เอสเปรสโซ่ (เย็น)</v-col>
              <v-col cols="6" align="end" class="ma-0 pa-0">50</v-col>
              <v-col cols="12" class="ma-0 pa-0">1 × 50.00</v-col>
            </v-row>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="9"><p>1แถม1 3วัน เท่านั้น 5-7/11/64</p> </v-col>
          <v-col cols="3" align="end"> -5000 </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col class="ma-4">
            <v-row v-for="i in 3" :key="i">
              <v-col cols="6" class="ma-0 pa-0">รวมทั้งหมด</v-col>
              <v-col cols="6" align="end" class="ma-0 pa-0">50</v-col>
            </v-row>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col class="ma-4">
            <v-row>
              <v-col cols="6" class="ma-0 pa-0">07 Nov 2021 17:24</v-col>
              <v-col cols="6" align="end" class="ma-0 pa-0">No #1-1419</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
export default {
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
    drawer: false,
  }),
  head() {
    return {
      title: 'ใบเสร็จรับเงิน',
    }
  },
  created() {
    // console.log(this.customers)
    // console.log(this.employees)
    // this.receipts = this.allReceipts.filter((r) => r.cancelled_at === null)
  },
  methods: {
    getDateRange(obj) {
      this.loading = true
      const { dayList } = obj
      let dates = []
      this.items = []
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
        date: this.$options.filters.dateTh(data.receipt_date),
        employee: this.findEmployee(data.employee_id),
        customer: this.findCustomer(data.customer_id),
        type: this.changeTypeWord(data.receipt_type, data.cancelled_at),
        total: this.$options.filters.currency(data.total_money),
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
        return result.name
      } else {
        return '-'
      }
    },
    changeTypeWord(type, cancel) {
      const word = type === 'SALE' ? 'การขาย' : 'คืนเงิน'
      if (cancel) {
        return word + ' ( ยกเลิก )'
      } else {
        return word
      }
      // console.log(type, cancel)
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
  },
}
</script>
