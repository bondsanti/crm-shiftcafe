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
    // allReceipts: {
    //   type: Array,
    //   default: () => [],
    // },
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
        text: 'ต้นทุนสินค้า',
        align: 'start',
        sortable: false,
        value: 'cost',
      },
      {
        text: 'ยอดขายหลังหักต้นทุน',
        align: 'start',
        sortable: false,
        value: 'profit',
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
        value: 0,
        text: 'คืนเงิน',
        icon: 'mdi-cash-refund',
        color: 'red',
      },
      {
        value: 0,
        text: 'ส่วนลด',
        icon: 'mdi-cash-minus',
        color: 'warning',
      },
      {
        value: 0,
        text: 'ยอดขายสุทธิ',
        icon: 'mdi-cash-lock',
        color: 'primary',
      },
      {
        value: 0,
        text: 'เป้าหมายเดือนนี้',
        icon: 'mdi-target',
        color: 'primary',
      },
      {
        value: 0,
        text: 'กำไรสุทธิ',
        icon: 'mdi-account-cash',
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
  computed: {
    allReceipts() {
      return this.$store.state.adminData.receipts
    },
  },
  created() {
    // console.log(this.allReceipts)
    if (this.allReceipts) {
      this.receipts = this.allReceipts.filter((r) => r.cancelled_at === null)
      if (this.receipts.length !== 0) {
        const end = this.receipts.length - 1
        this.time.start = moment(this.receipts[end].receipt_date).format(
          'YYYY-MM-DD'
        )
        this.time.end = moment(this.receipts[0].receipt_date).format(
          'YYYY-MM-DD'
        )
      }
    }
    // setTimeout(() => {
    //   this.calculate()
    // }, 1300)
  },

  methods: {
    getDateRange(obj) {
      const { dayList, goal } = obj
      // console.log(goal.replace(/,/g, ''))
      const daysInMonth = moment(dayList[0], 'YYYY-MM-DD').daysInMonth()
      const goal2 = goal.replace(/,/g, '')
      this.loading = true
      const dates = []
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
      // console.log(dayList)

      setTimeout(() => {
        this.items = []
        dates.map((d, i) => {
          this.makeItRightForTable(d, i, dates, goal2)
          return d
        })
        this.loading = false
        // find target for month
        this.itemsSubHeader[3].value = this.$options.filters.currency(
          goal2 * daysInMonth
        )
      }, 1200)
      // find profit
      setTimeout(() => {
        this.calculate()
        this.findProfit(
          this.itemsSubHeader[2].value,
          this.itemsSubHeader[3].value
        )
      }, 2000)
      // console.log(this.items)
    },
    findProfit(cost, target) {
      const profit =
        this.$options.filters.unFormatCurrency(cost) -
        this.$options.filters.unFormatCurrency(target)
      this.itemsSubHeader[4].value = this.$options.filters.currency(profit)
      if (profit < 0) {
        this.itemsSubHeader[4].color = 'red'
      } else {
        this.itemsSubHeader[4].color = 'success'
      }
    },
    calculate() {
      // let sale = 0
      let refund = 0
      let discount = 0
      let profit = 0

      this.items.map((i) => {
        // sale += this.$options.filters.unFormatCurrency(i.sales)
        refund += this.$options.filters.unFormatCurrency(i.refund)
        discount += this.$options.filters.unFormatCurrency(i.discount)
        profit += this.$options.filters.unFormatCurrency(i.profit)
        return i
      })
      // this.itemsSubHeader[0].value = sale
      this.itemsSubHeader[0].value = this.$options.filters.currency(refund)
      this.itemsSubHeader[1].value = this.$options.filters.currency(discount)
      this.itemsSubHeader[2].value = this.$options.filters.currency(profit)
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
      const cost = this.findCost(data.value)
      const profit = total - cost
      const obj = {
        date: data.dateName,
        sales: this.$options.filters.comma(sales, 2),
        refund: this.$options.filters.comma(refund, 2),
        discount: this.$options.filters.comma(discount, 2),
        total: this.$options.filters.comma(total, 2),
        cost: this.$options.filters.comma(cost, 2),
        profit: this.$options.filters.comma(profit, 2),
        diffPerGoal: profit !== 0 ? profit - goal : 0,
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
    findCost(data) {
      let allItem = []
      let cost = 0
      data.map((d) => {
        allItem = [...allItem, ...d.line_items]
        return 0
      })

      allItem.map((a) => (cost += a.cost))
      //  console.log(cost)

      return cost
    },
  },
}
</script>
