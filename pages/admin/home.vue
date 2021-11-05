<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />
    <v-row justify="center" dense class="ma-2">
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard title="สรุปยอดขาย" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามหมวดหมู่"
          icon="mdi-food-off-outline"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามประเภทการชำระเงิน"
          icon="mdi-cash-register"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard title="ใบเสร็จรับเงิน" icon="mdi-receipt" />
      </v-col>
    </v-row>
    <v-row class="ma-3">
      <AdminTable
        title="สรุปยอดขาย"
        icon="mdi-cash"
        :headers="headers"
        :items="desserts"
        :items-sub-header="itemsSubHeader"
      />
    </v-row>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const result = await $axios.$get('/receipt')
    console.log(result)
  },
  data: () => ({
    headers: [
      {
        text: 'วันที่',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'ยอดขาย',
        align: 'start',
        sortable: false,
        value: 'calories',
      },
      { text: 'คืนเงิน', align: 'start', sortable: false, value: 'fat' },
      { text: 'ส่วนลด', align: 'start', sortable: false, value: 'carbs' },
      {
        text: 'ยอดขายสุทธิ',
        align: 'start',
        sortable: false,
        value: 'protein',
      },
      {
        text: 'ต้นทุนของสินค้า',
        align: 'start',
        sortable: false,
        value: 'iron',
      },
      {
        text: 'กำไรรวม',
        align: 'start',
        sortable: false,
        value: 'iron',
      },
      {
        text: 'ผลต่าง',
        align: 'start',
        sortable: false,
        value: 'iron',
      },
      {
        text: 'ภาษี',
        align: 'start',
        sortable: false,
        value: 'iron',
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
      {
        value: 5,
        text: 'กำไรรวม',
        icon: 'mdi-cash-plus',
      },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
    ],
  }),
}
</script>
