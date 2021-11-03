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
        <v-row v-show="systemBar" justify="center" class="mt-n3">
          <v-slide-group v-model="slide" show-arrows class="mt-3">
            <v-slide-item>
              <v-menu offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    :input-value="1"
                    active-class="warning white--text"
                    color="primary"
                    depressed
                    v-bind="attrs"
                    v-on="on"
                  >
                    รายงาน
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in reports"
                    :key="index"
                    link
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-slide-item>
            <v-slide-item>
              <v-menu offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    active-class="warning white--text"
                    color="primary"
                    depressed
                    v-bind="attrs"
                    v-on="on"
                  >
                    รายการสินค้า
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in products"
                    :key="index"
                    link
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-slide-item>
            <v-slide-item>
              <v-btn
                class="mx-2"
                color="primary"
                active-class="warning white--text"
                depressed
              >
                ลูกค้า
              </v-btn>
            </v-slide-item>
            <v-slide-item>
              <v-btn
                class="mx-2"
                color="primary"
                active-class="warning white--text"
                depressed
              >
                ออกจากระบบ
              </v-btn>
            </v-slide-item>
          </v-slide-group>
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
      reports: [{ title: 'สรุปยอดขาย' }, { title: 'ใบเสร็จรับเงิน' }],
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
