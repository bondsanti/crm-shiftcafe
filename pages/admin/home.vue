<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />
    <v-row justify="center" dense class="ma-2">
      <v-col cols="12" sm="6" md="4" lg="2">
        <AdminTopCard title="ยอดขาย" icon="mdi-cash-check" />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard title="คืนเงิน" icon="mdi-cash-refund" />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="2">
        <AdminTopCard title="ส่วนลด" />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <AdminTopCard title="ยอดขายสุทธิ" icon="mdi-cash-remove" />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="2">
        <AdminTopCard title="กำไรรวม" icon="mdi-cash-remove" />
      </v-col>
    </v-row>
    <v-row class="ma-3">
      <AdminTable title="ยอดขาย" :headers="headers" :items="desserts" />
    </v-row>
  </div>
</template>
<script>
export default {
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
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
  }),
}
</script>
