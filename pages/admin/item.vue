<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />

    <v-row class="ma-3">
      <AdminTable
        :title="title"
        icon="mdi-cash"
        btn
        show-select-input
        :headers="headers"
      />
    </v-row>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const [items, categories] = await Promise.all([
      $axios.$get('/item'),
      $axios.$get('/item/category'),
    ])
    // console.log(items, categories)
    return { items, categories }
  },
  data() {
    return {
      title: 'รายการสินค้า',
      headers: [
        {
          text: 'ชื่อสินค้า',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'ประเภท',
          align: 'start',
          sortable: false,
          value: 'category',
        },
        { text: 'ราคาขาย', align: 'start', sortable: false, value: 'price' },
        { text: 'ต้นทุน', align: 'start', sortable: false, value: 'cost' },
      ],
    }
  },
  head() {
    return {
      title: 'รายการสินค้า',
    }
  },
  methods: {},
}
</script>
