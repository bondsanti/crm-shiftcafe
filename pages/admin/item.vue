<template>
  <div>
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
  layout: 'admin',
  middleware: ['requireSignIn', 'refreshData'],
  validate({ store }) {
    const { user } = store.state.auth
    // console.log(user)
    const result = user.role.includes('item')
    if (!result) {
      const error = new Error(
        `คุณไม่มีสิทธิ์เข้าถึงส่วนรายการสินค้า โปรดติดต่อผู้ดูแลระบบ`
      )
      error.statusCode = 401

      throw error
    }

    return user.role.includes('item')
  },
  transition: 'home',
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
      timeout: null,
    }
  },
  head() {
    return {
      title: 'รายการสินค้า',
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
    this.getData()
    this.makeItRightForSelect()
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    getData() {
      this.loading = true
      // console.log(this.productItems)
      this.adminData.items.map((d) => {
        this.makeItRightForTable(d)
        return d
      })
      this.timeout = setTimeout(() => {
        // this.calculate()
        this.items2 = this.items
        this.loading = false
      }, 1200)
    },
    makeItRightForTable(data) {
      const obj = {
        name: data.item_name,
        category: this.findCategory(data.category_id).name,
        price: this.$options.filters.comma(data.variants[0].default_price, 2),
        cost: this.$options.filters.comma(data.variants[0].cost, 2),
        category_id: data.category_id,
      }

      this.items.push(obj)
    },
    findCategory(id) {
      const result = this.adminData.categories.find((c) => c.id === id)
      return result
    },
    makeItRightForSelect() {
      const array = [
        {
          text: 'ทั้งหมด',
          value: 'all',
        },
      ]
      this.adminData.categories.map((c) => {
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
        this.timeout = setTimeout(() => {
          this.items2 = this.items
          this.loading = false
        }, 500)
      } else {
        const result = this.items.filter((i) => i.category_id === text)
        this.timeout = setTimeout(() => {
          this.items2 = result
          this.loading = false
        }, 500)
      }
    },
  },
}
</script>
