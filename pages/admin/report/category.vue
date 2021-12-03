<template>
  <v-row class="ma-3">
    <AdminTable
      :title="title"
      icon="mdi-food-outline"
      show-date-input
      target
      excel-first-col
      :headers="headers"
      :items="items2"
      :loading="loading"
      :time="time"
      @getDateRange="getData"
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
      title: 'แยกตามหมวดหมู่',
      headers: [
        {
          text: 'ประเภท',
          align: 'start',
          sortable: false,
          value: 'category',
        },
        {
          text: 'จำนวนที่ขายได้ทั้งหมด',
          align: 'start',
          sortable: false,
          value: 'total',
        },
        {
          text: 'จำนวนที่ขาย',
          align: 'start',
          sortable: false,
          value: 'sale',
        },
        {
          text: 'จำนวนที่คืน',
          align: 'start',
          sortable: false,
          value: 'refund',
        },
        {
          text: 'จำนวนที่ยกเลิก',
          align: 'start',
          sortable: false,
          value: 'cancel',
        },
      ],
      items: [],
      items2: [],
      loading: false,
      time: {
        start: '2021-11-05',
        end: '2021-11-30',
      },
      itemsInReceipt: {
        cancel: [],
        refund: [],
        sale: [],
      },
      timeout: null,
    }
  },
  head() {
    return {
      title: 'ยอดขายแยกตามหมวดหมู่',
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
    if (this.adminData.receipts.length !== 0) {
      const end = this.adminData.receipts.length - 1
      this.time.start = moment(
        this.adminData.receipts[end].receipt_date
      ).format('YYYY-MM-DD')
      this.time.end = moment(this.adminData.receipts[0].receipt_date).format(
        'YYYY-MM-DD'
      )
    }
    // this.filterReceipts()
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    getData(obj) {
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
      // console.log(dates)
      this.filterReceipts(dates)
      // console.log(this.productItems)
      this.adminData.categories.map((d) => {
        this.makeItRightForTable(d)
        return d
      })

      // เรียงจากมากไปน้อย
      const itemsSort = this.items.sort(
        (a, b) => parseInt(b.sale) - parseInt(a.sale)
      )
      this.timeout = setTimeout(() => {
        // this.calculate()
        this.items2 = itemsSort
        this.loading = false
      }, 1200)
    },
    filterReceipts(receipts) {
      let itemCancel = []
      let itemRefund = []
      let itemSale = []
      const cancel = receipts.filter((r) => r.cancelled_at !== null)
      const refund = receipts.filter(
        (r) => r.cancelled_at === null && r.receipt_type === 'REFUND'
      )
      const sale = receipts.filter(
        (r) => r.cancelled_at === null && r.receipt_type === 'SALE'
      )
      // ----
      cancel.map((c) => {
        itemCancel = [...itemCancel, ...c.line_items]
        return c
      })
      refund.map((c) => {
        itemRefund = [...itemRefund, ...c.line_items]
        return c
      })
      sale.map((c) => {
        itemSale = [...itemSale, ...c.line_items]
        return c
      })
      // ----
      itemCancel = itemCancel.map((i) => {
        return { ...i, category_id: this.findCategoryIdInItems(i.item_id) }
      })
      itemRefund = itemRefund.map((i) => {
        return { ...i, category_id: this.findCategoryIdInItems(i.item_id) }
      })
      itemSale = itemSale.map((i) => {
        return { ...i, category_id: this.findCategoryIdInItems(i.item_id) }
      })
      // console.log(itemCancel)
      // console.log(itemRefund)
      // console.log(itemSale)
      this.itemsInReceipt.cancel = itemCancel
      this.itemsInReceipt.refund = itemRefund
      this.itemsInReceipt.sale = itemSale
    },
    filterReceiptsByDate(date) {
      // console.log(new Date(date))
      const result = this.adminData.receipts.filter((r) => {
        return (
          new Date(r.receipt_date).getDate() === new Date(date).getDate() &&
          new Date(r.receipt_date).getMonth() === new Date(date).getMonth() &&
          new Date(r.receipt_date).getFullYear() ===
            new Date(date).getFullYear()
        )
      })
      return result
    },
    findCategoryIdInItems(id) {
      // console.log(id)
      const res = this.adminData.items.find((i) => i.id === id)
      // console.log(res)
      return res ? res.category_id : null
    },
    makeItRightForTable(data) {
      let countSale = 0
      const sale = this.filterItemsSaleByCategory(data.id)
      sale.map((s) => (countSale += s.quantity))

      let countRefund = 0
      const refund = this.filterItemsRefundByCategory(data.id)
      refund.map((r) => (countRefund += r.quantity))

      let countCancel = 0
      const cancel = this.filterItemsCancelByCategory(data.id)
      cancel.map((c) => (countCancel += c.quantity))
      // console.log(cancel)
      const totaly = countCancel + countRefund + countSale
      const obj = {
        category: data.name,
        total: this.$options.filters.comma(totaly),
        sale: countSale,
        refund: this.$options.filters.comma(countRefund),
        cancel: this.$options.filters.comma(countCancel),
      }

      this.items.push(obj)
    },
    filterItemsSaleByCategory(cateId) {
      // console.log(this.itemsInReceipt.sale)
      const res = this.itemsInReceipt.sale.filter(
        (s) => s.category_id === cateId
      )
      return res
    },
    filterItemsRefundByCategory(cateId) {
      // console.log(this.itemsInReceipt.sale)
      const res = this.itemsInReceipt.refund.filter(
        (s) => s.category_id === cateId
      )
      return res
    },
    filterItemsCancelByCategory(cateId) {
      // console.log(this.itemsInReceipt.sale)
      const res = this.itemsInReceipt.cancel.filter(
        (s) => s.category_id === cateId
      )
      return res
    },
  },
}
</script>
