<template>
  <v-row class="ma-3">
    <AdminTable
      :title="title"
      icon="mdi-food-variant"
      show-date-input
      target
      chip
      second-row
      excel-first-col
      :headers="headers"
      :items-sub-header="itemsSubHeader"
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
      title: 'แยกตามตัวเลือก',
      headers: [
        {
          text: 'วันที่',
          align: 'start',
          sortable: false,
          value: 'dateTime',
        },
        {
          text: 'เลขที่ใบเสร็จ',
          align: 'start',
          sortable: false,
          value: 'receipt_number',
        },
        {
          text: 'ประเภทใบเสร็จ',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        {
          text: 'ประเภท',
          align: 'start',
          sortable: false,
          value: 'category',
        },
        {
          text: 'ชื่อสินค้า',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'ตัวเลือก',
          align: 'start',
          sortable: false,
          value: 'option',
        },
        {
          text: 'จำนวน',
          align: 'start',
          sortable: false,
          value: 'quantity',
        },
        {
          text: 'ยอดขายรวม',
          align: 'start',
          sortable: false,
          value: 'total',
        },
        {
          text: 'ส่วนลด',
          align: 'start',
          sortable: false,
          value: 'discount',
        },
        {
          text: 'ยอดขายสุทธิ',
          align: 'start',
          sortable: false,
          value: 'net',
        },
        {
          text: 'ออเดอร์',
          align: 'start',
          sortable: false,
          value: 'order',
        },
        {
          text: 'พนักงาน',
          align: 'start',
          sortable: false,
          value: 'employee',
        },
      ],
      itemsSubHeader: [
        {
          value: 0,
          text: 'แก้วร้อน',
          icon: 'mdi-glass-mug',
          color: 'primary',
        },
        {
          value: 0,
          text: 'แก้วเย็น',
          icon: 'mdi-glass-mug-variant',
          color: 'primary',
        },
        {
          value: 0,
          text: 'แก้วปั่น',
          icon: 'mdi-glass-fragile',
          color: 'primary',
        },
      ],
      items: [],
      items2: [],
      loading: false,
      time: {
        start: '2021-11-05',
        end: '2021-11-30',
      },
      timeout: null,
    }
  },
  head() {
    return {
      title: 'ยอดขายแยกตามตัวเลือก',
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
      let allLineItem = []
      // ลูปทุกสินค้าในใบเสร็จ
      dates.map((d) => {
        const res = this.getAllLineItemInReceipt(d)
        allLineItem = [...allLineItem, ...res]
        return d
      })

      allLineItem.map((a) => this.makeItRightForTable(a))
      this.timeout = setTimeout(() => {
        this.calculate()
        this.items2 = this.items
        this.loading = false
      }, 1200)

      // console.log(allLineItem)
      // console.log(this.items)
    },
    calculate() {
      let hot = 0
      let cold = 0
      let frappe = 0
      this.items.map((item) => {
        if (item.option === 'ร้อน') {
          hot += item.quantity
        } else if (item.option === 'เย็น') {
          cold += item.quantity
        } else if (item.option === 'ปั่น') {
          frappe += item.quantity
        }
        return item
      })
      // console.log(hot, cold, frappe)
      this.itemsSubHeader[0].value = this.$options.filters.comma(hot)
      this.itemsSubHeader[1].value = this.$options.filters.comma(cold)
      this.itemsSubHeader[2].value = this.$options.filters.comma(frappe)
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
    makeItRightForTable(data) {
      const disC = this.findDiscountInLineItem(
        data.line_itemDetail.line_discounts
      )
      const totaly = data.line_itemDetail.price * data.line_itemDetail.quantity
      // console.log(data)
      const obj = {
        dateTime: data.created_at,
        receipt_number: data.receipt_number,
        type: this.findReceiptType(data.cancelled_at, data.receipt_type),
        category: this.findCategory(data.line_itemDetail),
        name: data.line_itemDetail.item_name,
        option: data.line_itemDetail.variant_name,
        quantity: this.findQuantity(
          data.cancelled_at,
          data.receipt_type,
          data.line_itemDetail.quantity
        ),
        total: totaly,
        discount: disC,
        net: totaly - disC,
        order: data.dining_option,
        employee: this.findEmployee(data.employee_id),
      }
      this.items.push(obj)
    },
    getAllLineItemInReceipt(data) {
      // console.log(data)
      const result = []
      data.line_items.map((l) => {
        return result.push({ ...data, line_itemDetail: l })
      })
      return result
    },
    findReceiptType(cancelAt, receiptType) {
      // console.log(cancelAt, receiptType)
      if (cancelAt !== null) {
        return 'ยกเลิก'
      } else {
        return receiptType === 'SALE' ? 'การขาย' : 'คืนเงิน'
      }
    },
    findDiscountInLineItem(lineDiscount) {
      let discount = 0
      lineDiscount.map((l) => (discount += l.money_amount))
      return discount
    },
    findQuantity(cancelAt, receiptType, quantity) {
      // console.log(cancelAt, receiptType, quantity)
      if (cancelAt) {
        return -quantity
      } else if (receiptType === 'REFUND') {
        return -quantity
      } else {
        return quantity
      }
    },
    findCategory(item) {
      const resultItemDetail = this.adminData.items.find(
        (i) => i.id === item.item_id
      )
      if (resultItemDetail) {
        const resultCategoryDetail = this.adminData.categories.find(
          (c) => c.id === resultItemDetail.category_id
        )
        // console.log(resultCategoryDetail)
        return resultCategoryDetail.name
      } else {
        return ''
      }
    },
    findEmployee(empId) {
      // console.log(empId)
      const res = this.adminData.employees.find((e) => e.id === empId)
      return res?.name
    },
  },
}
</script>
