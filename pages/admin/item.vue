<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />

    <v-row class="ma-3">
      <AdminTable
        :title="title"
        icon="mdi-food-outline"
        btn
        show-select-input
        target
        excel-first-col
        :headers="headers"
        :items="items2"
        :loading="loading"
        :items-for-select="itemsForSelect"
        @receiveDataSelectFromChild="filterProduct"
      />
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: ['requireSignIn'],
  async asyncData({ $axios }) {
    const [productItems, categories] = await Promise.all([
      $axios.$get('/item'),
      $axios.$get('/item/category'),
    ])
    // console.log(items, categories)
    return { productItems, categories }
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
      items: [],
      items2: [],
      loading: false,
      itemsForSelect: [],
    }
  },
  head() {
    return {
      title: 'รายการสินค้า',
    }
  },
  created() {
    this.getData()
    this.makeItRightForSelect()
  },
  methods: {
    getData() {
      this.loading = true
      // console.log(this.productItems)
      this.productItems.map((d) => {
        this.makeItRightForTable(d)
        return d
      })
      setTimeout(() => {
        // this.calculate()
        this.items2 = this.items
        this.loading = false
      }, 1200)
    },
    makeItRightForTable(data) {
      const obj = {
        name: data.item_name,
        category: this.findCategory(data.category_id).name,
        price: this.$options.filters.currency(data.variants[0].default_price),
        cost: this.$options.filters.currency(data.variants[0].cost),
        category_id: data.category_id,
      }

      this.items.push(obj)
    },
    findCategory(id) {
      const result = this.categories.find((c) => c.id === id)
      return result
    },
    makeItRightForSelect() {
      const array = [
        {
          text: 'ทั้งหมด',
          value: 'all',
        },
      ]
      this.categories.map((c) => {
        const obj = {
          text: c.name,
          value: c.id,
        }
        array.push(obj)
        return c
      })
      this.itemsForSelect = array
    },
    filterProduct(text) {
      this.loading = true
      this.items2 = []
      // console.log(text)
      if (text === 'all') {
        setTimeout(() => {
          this.items2 = this.items
          this.loading = false
        }, 500)
      } else {
        const result = this.items.filter((i) => i.category_id === text)
        setTimeout(() => {
          this.items2 = result
          this.loading = false
        }, 500)
      }
    },
  },
}
</script>
