<template>
  <v-row class="ma-3">
    <AdminTable
      title="สรุปยอดขาย"
      icon="mdi-cash"
      chip
      target
      show-date-input
      second-row
      :headers="headers"
      :items="items"
      :items-sub-header="itemsSubHeader"
      :loading="loading"
      :time="time"
      @getDateRange="getDateRange"
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
  },

  data: () => ({
    receipts: [],
    headers: [
      {
        text: 'วันที่',
        align: 'start',
        sortable: false,
        value: 'date',
      },
      {
        text: 'ยอดขาย',
        align: 'start',
        sortable: false,
        value: 'sales',
      },
      { text: 'คืนเงิน', align: 'start', sortable: false, value: 'refund' },
      { text: 'ส่วนลด', align: 'start', sortable: false, value: 'discount' },
      {
        text: 'ยอดขายสุทธิ',
        align: 'start',
        sortable: false,
        value: 'total',
      },
      {
        text: 'ผลต่าง จากยอดขายวันก่อน',
        align: 'start',
        sortable: false,
        value: 'diffPerYesterday',
      },
      {
        text: 'ผลต่าง จากเป้าหมาย',
        align: 'start',
        sortable: false,
        value: 'diffPerGoal',
      },
    ],
    itemsSubHeader: [
      {
        value: 100,
        text: 'ยอดขาย',
        icon: 'mdi-cash',
        color: 'primary',
      },
      {
        value: 2,
        text: 'คืนเงิน',
        icon: 'mdi-cash-refund',
        color: 'red',
      },
      {
        value: 3,
        text: 'ส่วนลด',
        icon: 'mdi-cash-minus',
        color: 'warning',
      },
      {
        value: 4,
        text: 'ยอดขายสุทธิ',
        icon: 'mdi-cash-lock',
        color: 'primary',
      },
    ],
    items: [],
    loading: false,
    time: {
      start: '2021-11-05',
      end: '2021-11-30',
    },
  }),
  head() {
    return {
      title: 'สรุปยอดขาย',
    }
  },
  created() {
    // console.log(this.allReceipts)
    this.receipts = this.allReceipts.filter((r) => r.cancelled_at === null)
    if (this.receipts.length !== 0) {
      const end = this.receipts.length - 1
      this.time.start = moment(this.receipts[end].receipt_date).format(
        'YYYY-MM-DD'
      )
      this.time.end = moment(this.receipts[0].receipt_date).format('YYYY-MM-DD')
    }
  },
  methods: {
    getDateRange(obj) {
      const { dayList, goal } = obj
      // console.log(goal.replace(/,/g, ''))
      const goal2 = goal.replace(/,/g, '')
      this.loading = true
      const dates = []
      this.items = []
      dayList.reverse().map((d) => {
        const res = this.filterReceiptsByDate(d)
        const obj = {
          dateName: d,
          value: res,
        }
        dates.push(obj)

        return res
      })
      // หน่วงเวลา
      // console.log(dates)

      setTimeout(() => {
        dates.map((d, i) => {
          this.makeItRightForTable(d, i, dates, goal2)
          return d
        })
        this.loading = false
        this.calculate()
      }, 1200)
    },
    calculate() {
      let sale = 0
      let refund = 0
      let discount = 0
      let total = 0
      this.items.map((i) => {
        sale += this.$options.filters.unFormatCurrency(i.sales)
        refund += this.$options.filters.unFormatCurrency(i.refund)
        discount += this.$options.filters.unFormatCurrency(i.discount)
        total += this.$options.filters.unFormatCurrency(i.total)
        return i
      })
      this.itemsSubHeader[0].value = sale
      this.itemsSubHeader[1].value = refund
      this.itemsSubHeader[2].value = discount
      this.itemsSubHeader[3].value = total
    },

    filterReceiptsByDate(date) {
      // console.log(new Date(date))
      const result = this.receipts.filter((r) => {
        return (
          new Date(r.receipt_date).getDate() === new Date(date).getDate() &&
          new Date(r.receipt_date).getMonth() === new Date(date).getMonth() &&
          new Date(r.receipt_date).getFullYear() ===
            new Date(date).getFullYear()
        )
      })
      return result
    },
    makeItRightForTable(data, index, datas, goal) {
      const refund =
        this.findRefund(data.value).refund +
        this.findRefund(data.value).discount
      const discount =
        this.findDiscount(data.value) - this.findRefund(data.value).discount
      const total =
        this.findSale(data.value) - this.findRefund(data.value).refund
      const sales = total + discount + refund
      const obj = {
        date: this.$options.filters.dateTh(data.dateName),
        sales: this.$options.filters.currency(sales),
        refund: this.$options.filters.currency(refund),
        discount: this.$options.filters.currency(discount),
        total: this.$options.filters.currency(total),
        diffPerGoal: total !== 0 ? total - goal : 0,
        diffPerYesterday: this.findDiffPerYesterday(total, index, datas),
      }
      this.items.push(obj)
    },
    findDiffPerYesterday(totalToday, index, datas) {
      const yesterday = index + 1
      let totalYesterday = 0
      if (datas[yesterday]) {
        totalYesterday =
          this.findSale(datas[yesterday].value) -
          this.findRefund(datas[yesterday].value).refund
        return totalYesterday !== 0 ? totalToday - totalYesterday : 0
      } else {
        return 0
      }
      // console.log(totalToday - totalYesterday)
    },
    findSale(data) {
      let sale = 0
      const result = data.filter((d) => d.receipt_type === 'SALE')
      result.map((s) => {
        sale += s.total_money
        return sale
      })
      return sale
    },
    findRefund(data) {
      let refund = 0
      let totalDiscount = 0
      const result = data.filter((d) => d.receipt_type === 'REFUND')
      result.map((s) => {
        refund += s.total_money
        totalDiscount += s.total_discount
        return refund
      })
      return { refund, discount: totalDiscount }
    },
    findDiscount(data) {
      let discount = 0
      const result = data.filter((d) => d.receipt_type === 'SALE')
      result.map((s) => {
        discount += s.total_discount
        return discount
      })
      // return this.$options.filters.currency(discount)
      return discount
    },
  },
}
</script>
