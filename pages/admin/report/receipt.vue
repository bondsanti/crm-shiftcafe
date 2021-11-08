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
      :time="time"
      @getDateRange="getDateRange"
      @filterReceipt="filterReceipt"
      @openDrawer="viewReceiptDetail"
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
      <v-app-bar color="grey darken-2" elevation="4"
        ><v-spacer></v-spacer> <Logo width="50" height="50" />
        <v-spacer></v-spacer
      ></v-app-bar>
      <v-container>
        <v-row justify="center">
          <v-col class="ma-3">
            <v-row justify="end"
              ><div
                :class="
                  textReceiptColor(
                    changeTypeWord(
                      receiptDetail.receipt_type,
                      receiptDetail.cancelled_at
                    )
                  )
                "
              >
                {{
                  changeTypeWord(
                    receiptDetail.receipt_type,
                    receiptDetail.cancelled_at
                  )
                }}
                {{ receiptDetail.refund_for || '' }}
              </div>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" align="center" class="ma-0 pa-0">
                <h1>{{ receiptDetail.total_money | currencyTwoDot }}บาท</h1>
              </v-col>
              <h4>รวมทั้งหมด</h4>
            </v-row>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="12">
            <p class="pa-0 ma-0">รายการออเดอร์: {{ receiptDetail.order }}</p>
            <p class="pa-0 ma-0">
              แคชเชียร์: {{ findEmployee(receiptDetail.employee_id) }}
            </p>
            <p class="pa-0 ma-0">
              ระบบขายหน้าร้าน: {{ receiptDetail.pos_device_id }}
            </p>
          </v-col>
        </v-row>
        <hr v-show="receiptDetail.customer_id" />
        <v-row v-show="receiptDetail.customer_id">
          <v-col cols="12">
            <p class="pa-0 ma-0">
              ลูกค้า: {{ findCustomer(receiptDetail.customer_id).name }}
            </p>
            <p class="pa-0 ma-0">
              {{ findCustomer(receiptDetail.customer_id).phone_number }}
            </p>
            <p class="pa-0 ma-0">
              {{ findCustomer(receiptDetail.customer_id).email }}
            </p>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col>
            <h2>{{ receiptDetail.dining_option }}</h2>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col class="ma-4">
            <v-row v-for="(item, i) in receiptDetail.line_items" :key="i">
              <v-col cols="9" class="ma-0 pa-0">{{
                `${item.item_name} ${
                  item.variant_name ? '(' + item.variant_name + ')' : ''
                }`
              }}</v-col>
              <v-col cols="3" align="end" class="ma-0 pa-0">{{
                item.price | currencyTwoDot
              }}</v-col>
              <v-col cols="12" class="ma-0 pa-0"
                ><div class="caption">
                  {{ item.quantity }}*{{ item.price | currencyTwoDot }}
                </div></v-col
              >
              <v-col v-show="item.line_note" cols="12" class="ma-0 pa-0"
                ><div class="caption">{{ `${item.line_note}` }}</div></v-col
              >
            </v-row>
          </v-col>
        </v-row>
        <hr v-show="receiptDetail.total_discounts.length !== 0" />
        <v-row v-show="receiptDetail.total_discounts.length !== 0">
          <v-col class="my-4">
            <v-row v-for="(item, i) in receiptDetail.total_discounts" :key="i">
              <v-col class="my-0 py-0" cols="9">{{ item.name }} </v-col>
              <v-col class="my-0 py-0" cols="3" align="end">
                - {{ item.money_amount }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col class="ma-4">
            <v-row>
              <v-col cols="6" class="ma-0 pa-0"><h2>รวมทั้งหมด</h2></v-col>
              <v-col cols="6" align="end" class="ma-0 pa-0"
                ><h2>
                  {{ receiptDetail.total_money | currencyTwoDot }}
                </h2></v-col
              >
            </v-row>
            <v-row v-for="(item, i) in receiptDetail.payments" :key="i">
              <v-col cols="6" class="ma-0 pa-0">{{ item.name }}</v-col>
              <v-col cols="6" align="end" class="ma-0 pa-0">{{
                item.money_amount | currencyTwoDot
              }}</v-col>
            </v-row>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col class="ma-4">
            <v-row>
              <v-col cols="8" class="ma-0 pa-0">{{
                receiptDetail.receipt_date | dateThWithTime
              }}</v-col>
              <v-col cols="4" align="end" class="ma-0 pa-0"
                >No {{ receiptDetail.receipt_number }}</v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import moment from 'moment'
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
    const end = this.allReceipts.length - 1
    this.time.start = moment(this.allReceipts[end].receipt_date).format(
      'YYYY-MM-DD'
    )
    this.time.end = moment(this.allReceipts[0].receipt_date).format(
      'YYYY-MM-DD'
    )
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
        date: this.$options.filters.dateThWithTime(data.receipt_date),
        employee: this.findEmployee(data.employee_id),
        customer: this.findCustomer(data.customer_id).name,
        type: this.changeTypeWord(data.receipt_type, data.cancelled_at),
        total: this.$options.filters.currency(data.total_money),
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
    viewReceiptDetail(value) {
      this.drawer = true
      this.receiptDetail = value
      // console.log(value)
    },
    textReceiptColor(value) {
      if (value === 'การขาย') {
        return 'green--text'
      } else if (value === 'คืนเงิน') {
        return 'yellow--text'
      } else {
        return 'red--text'
      }
    },
  },
}
</script>
