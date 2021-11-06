<template>
  <v-row class="ma-3">
    <AdminTable
      title="ใบเสร็จรับเงิน"
      icon="mdi-cash"
      btn
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
  props: {
    allReceipts: {
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
        value: 100,
        text: 'ใบเสร็จรับเงินทั้งหมด',
        icon: 'mdi-receipt',
      },
      {
        value: 2,
        text: 'ยอดขาย',
        icon: 'mdi-cash',
      },
      {
        value: 3,
        text: 'คืนเงิน',
        icon: 'mdi-cash-refund',
      },
      {
        value: 4,
        text: 'ยกเลิก',
        icon: 'mdi-cash-remove',
      },
    ],
    items: [],
    loading: false,
  }),
  head() {
    return {
      title: 'ใบเสร็จรับเงิน',
    }
  },
  created() {
    // console.log(this.title)
    // this.receipts = this.allReceipts.filter((r) => r.cancelled_at === null)
  },
  methods: {
    getDateRange(dayList) {
      this.loading = true
      let dates = []
      this.items = []
      dayList.reverse().map((d) => {
        const res = this.filterReceiptsByDate(d)
        dates = [...dates, ...res]
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
        // this.calculate()
      }, 1200)
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
        employee: data.employee_id,
        customer: data.customer_id || '-',
        type: data.receipt_type,
        total: this.$options.filters.currency(data.total_money),
      }
      this.items.push(obj)
    },
  },
}
</script>
