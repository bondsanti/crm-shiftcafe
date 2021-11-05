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
            <v-chip v-for="(item, i) in items" :key="i" label>
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
        { text: 'รายงาน', value: 1 },
        { text: 'รายการสินค้า', value: 2 },
        { text: 'ลูกค้า', value: 2 },
        { text: 'รหัสตัวแทน', value: 2 },
        { text: 'ออกจากระบบ', value: 2 },
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
}
</script>
<style scoped></style>
