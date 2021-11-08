<template>
  <div>
    <v-app-bar
      color="primary"
      dark
      fixed
      app
      :prominent="prominent"
      :dense="dense"
    >
      <v-col align="center" class="ma-0 my-2 pa-0">
        <v-row justify="center" class="">
          <h2 class="font-weight-regular">
            <v-icon left :size="iconSize">{{ icon }}</v-icon>
            {{ title }}
          </h2>
        </v-row>
        <v-row v-show="systemBar" justify="center" class="ma-0 pa-0 mt-2">
          <v-chip-group mandatory active-class="warning--text" show-arrows>
            <v-chip
              v-for="(item, i) in items"
              :key="i"
              label
              @click="goTo(item.to)"
            >
              {{ item.text }}
            </v-chip>
          </v-chip-group>
        </v-row>
      </v-col>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'สมัครสมาชิก',
    },
    icon: {
      type: String,
      default: '',
    },
    systemBar: {
      type: Boolean,
      default: false,
    },
    prominent: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      slide: 1,
      items: [
        { text: 'รายงาน', to: '/admin/report' },
        { text: 'รายการสินค้า', to: '/admin/item' },
        { text: 'ลูกค้า', to: '/admin/customer' },
        { text: 'รหัสตัวแทน', to: '/admin/adviser' },
        { text: 'ออกจากระบบ', to: 'logout' },
      ],
      products: [{ title: 'ของหวาน' }, { title: 'อาหารทานเล่น' }],
    }
  },
  computed: {
    iconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 30
        case 'sm':
          return 45
        default:
          return 55
      }
    },
  },
  methods: {
    goTo(to) {
      // console.log(to)
      this.$router.push(to)
    },
  },
}
</script>
<style scoped></style>
