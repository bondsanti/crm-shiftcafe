<template>
  <div>
    <!-- <v-app-bar color="primary" dark fixed app
      ><v-spacer></v-spacer>
      <h2 class="my-1 font-weight-regular">
        <v-icon left :size="iconSize">{{ icon }}</v-icon>
        {{ title }}
      </h2>
      <v-spacer></v-spacer
    ></v-app-bar> -->
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
          <v-btn-toggle
            v-model="slide"
            tile
            color="error"
            group
            class="hidden-sm-and-down"
          >
            <!-- <v-btn value="left"> รายงาน </v-btn>

            <v-btn value="center"> ลูกค้า </v-btn>

            <v-btn value="right"> สิทธิ์เข้าถึง </v-btn>

            <v-btn value="justify"> ออกจากระบบ </v-btn> -->
            <v-menu v-for="i in 4" :key="i" offset-y>
              <template #activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  {{ i }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" link>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn-toggle>
          <v-slide-group
            v-model="slide"
            show-arrows
            class="mt-3 hidden-md-and-up"
          >
            <v-slide-item>
              <v-btn
                class="mx-2"
                :input-value="1"
                active-class="error white--text"
                depressed
                rounded
              >
                รายงาน
              </v-btn>
            </v-slide-item>
            <v-slide-item>
              <v-btn
                class="mx-2"
                active-class="error white--text"
                depressed
                rounded
              >
                ลูกค้า
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-row>
      </v-col>
      <!-- <v-col>
        <v-btn outlined color="secondary">รายงาน</v-btn>
        <v-btn outlined color="secondary">ลูกค้า</v-btn>
      </v-col> -->
    </v-app-bar>
    <!-- <v-system-bar v-show="systemBar" color="secondary" lights-out dark>
      <v-spacer></v-spacer>
      <v-btn x-small outlined color="primary">รายงาน</v-btn>
      <v-btn x-small outlined color="primary">ลูกค้า</v-btn>
      <v-btn-toggle v-model="text" tile color="primary" group>
        <v-btn id="no-background-hover" value="left" ripple> Left </v-btn>

        <v-btn value="center"> Center </v-btn>

        <v-btn value="right"> Right </v-btn>

        <v-btn value="justify"> Justify </v-btn>
      </v-btn-toggle>
      <span>12:30</span>
      <v-spacer></v-spacer>
    </v-system-bar> -->
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
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
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
