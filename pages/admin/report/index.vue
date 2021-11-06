<template>
  <v-row class="ma-3">
    <AdminTable
      title="สรุปยอดขาย"
      icon="mdi-cash"
      :headers="headers"
      :items="items"
      :items-sub-header="itemsSubHeader"
      :loading="loading"
      @getDateRange="getDateRange"
    />
  </v-row>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const result = await $axios.$get('/receipt')
    // const { receipts } = result
    // console.log(result)
    const receipt2 = result.filter((r) => r.cancelled_at === null)
    return { receipts: receipt2 }
  },
  data: () => ({
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
    ],
    itemsSubHeader: [
      {
        value: 100,
        text: 'ยอดขาย',
        icon: 'mdi-cash',
      },
      {
        value: 2,
        text: 'คืนเงิน',
        icon: 'mdi-cash-refund',
      },
      {
        value: 3,
        text: 'ส่วนลด',
        icon: 'mdi-cash-minus',
      },
      {
        value: 4,
        text: 'ยอดขายสุทธิ',
        icon: 'mdi-cash-lock',
      },
    ],
    items: [],
    loading: false,
  }),
  methods: {
    getDateRange(dayList) {
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
      console.log(dates)

      setTimeout(() => {
        dates.map((d) => {
          this.makeItRightForTable(d)
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
    makeItRightForTable(data) {
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
      }
      this.items.push(obj)
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
