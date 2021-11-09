<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />

    <v-row class="ma-3">
      <AdminTable :title="title" icon="mdi-cash" target btn />
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'รายการสินค้า',
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
    }
  },
}
</script>
