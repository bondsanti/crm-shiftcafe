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
          <v-bottom-navigation
            v-model="value"
            height="44"
            background-color="transparent"
            class="hidden-sm-and-down"
          >
            <v-btn
              v-for="(item, i) in items"
              :key="i"
              :value="item.text"
              @click="goTo(item.to)"
            >
              <span>{{ item.text }}</span>

              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </v-bottom-navigation>
          <v-speed-dial direction="bottom" class="mt-2 hidden-md-and-up">
            <template #activator>
              <v-btn v-model="fab" color="grey darken-2" dark fab>
                <v-icon v-if="fab">mdi-menu</v-icon>
                <Logo v-else />
              </v-btn>
            </template>
            <v-btn
              v-for="(item, i) in items"
              :key="i"
              dark
              small
              :color="
                item.nameRoute.includes($route.name) ? 'warning' : 'primary'
              "
              @click="goTo(item.to)"
            >
              <v-icon left>{{ item.icon }}</v-icon> {{ item.text }}
            </v-btn>
          </v-speed-dial>
        </v-row>
      </v-col>
    </v-app-bar>
    <ConfirmDialog
      ref="confirmDialog"
      title="คุณต้องการออกจากระบบหรือไม่ ?"
      @confirm="logout"
    />
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
      items: [
        {
          text: 'รายงาน',
          to: '/admin/report',
          icon: 'mdi-book',
          nameRoute: ['admin-report', 'admin-report-receipt'],
        },
        {
          text: 'รายการสินค้า',
          to: '/admin/item',
          icon: 'mdi-food-outline',
          nameRoute: ['admin-item'],
        },
        {
          text: 'ลูกค้า',
          to: '/admin/customer',
          icon: 'mdi-account-group',
          nameRoute: ['admin-customer'],
        },
        {
          text: 'ตัวแทน',
          to: '/admin/adviser',
          icon: 'mdi-account-tie-voice',
          nameRoute: ['admin-adviser'],
        },
        {
          text: 'ผู้ใช้',
          to: '/admin/user',
          icon: 'mdi-account',
          nameRoute: ['admin-user'],
        },
        {
          text: 'ออกจากระบบ',
          to: 'sign-out',
          icon: 'mdi-logout',
          nameRoute: [],
        },
      ],
      products: [{ title: 'ของหวาน' }, { title: 'อาหารทานเล่น' }],
      fab: false,
      value: 'ลูกค้า',
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
    nameRoute() {
      return this.$route.name
    },
  },
  created() {
    console.log(this.nameRoute)
    this.getRouteName()
  },
  methods: {
    goTo(to) {
      // console.log(to)
      if (to === 'sign-out') {
        this.$refs.confirmDialog.dialog = true
        // await this.$auth.logout()
      } else {
        this.$router.push(to)
      }
    },
    getRouteName() {
      const route = this.nameRoute
      if (route === 'admin-report' || route === 'admin-report-receipt') {
        this.value = 'รายงาน'
      } else if (route === 'admin-item') {
        this.value = 'รายการสินค้า'
      } else if (route === 'admin-customer') {
        this.value = 'ลูกค้า'
      } else if (route === 'admin-adviser') {
        this.value = 'ตัวแทน'
      } else if (route === 'admin-user') {
        this.value = 'ผู้ใช้'
      } else {
        this.value = 'ออกจากระบบ'
      }
    },
    async logout() {
      await this.$auth.logout()
      await this.$store.dispatch('clearState')
      this.$refs.confirmDialog.dialog = false
    },
  },
}
</script>
<style scoped></style>
