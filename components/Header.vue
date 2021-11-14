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
              value="โหลดข้อมูลใหม่"
              :disabled="progress"
              @click="goTo('refresh')"
            >
              <span>โหลดข้อมูลใหม่</span>

              <v-icon>mdi-database-refresh</v-icon>
            </v-btn>
            <v-btn
              v-for="(item, i) in items"
              v-show="showButton(item.value)"
              :key="i"
              :value="item.text"
              :disabled="progress"
              @click="goTo(item.to)"
            >
              <span>{{ item.text }}</span>

              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
            <v-btn
              value="ออกจากระบบ"
              :disabled="progress"
              @click="goTo('sign-out')"
            >
              <span>ออกจากระบบ</span>

              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-bottom-navigation>
          <v-speed-dial direction="bottom" class="mt-2 hidden-md-and-up">
            <template #activator>
              <v-btn v-model="fab" color="grey darken-2" dark fab>
                <v-progress-circular
                  v-show="progress"
                  indeterminate
                  color="primary"
                ></v-progress-circular>

                <Logo v-show="!progress" />
              </v-btn>
            </template>
            <v-btn dark small :disabled="progress" @click="goTo('refresh')">
              <v-icon left>mdi-database-refresh</v-icon> โหลดข้อมูลใหม่
            </v-btn>
            <v-btn
              v-for="(item, i) in items"
              v-show="showButton(item.value)"
              :key="i"
              dark
              small
              :disabled="progress"
              :color="
                item.nameRoute.includes($route.name) ? 'warning' : 'primary'
              "
              @click="goTo(item.to)"
            >
              <v-icon left>{{ item.icon }}</v-icon> {{ item.text }}
            </v-btn>
            <v-btn dark small :disabled="progress" @click="goTo('sign-out')">
              <v-icon left>mdi-logout</v-icon> ออกจากระบบ
            </v-btn>
          </v-speed-dial>
          <v-progress-linear
            v-show="progress"
            class="hidden-sm-and-down"
            rounded
            height="10"
            indeterminate
            color="yellow darken-2"
          ></v-progress-linear>
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
          nameRoute: [
            'admin-report',
            'admin-report-receipt',
            'admin-report-category',
            'admin-report-item',
          ],
          value: 'report',
        },
        {
          text: 'รายการสินค้า',
          to: '/admin/item',
          icon: 'mdi-food-outline',
          nameRoute: ['admin-item'],
          value: 'item',
        },
        {
          text: 'ลูกค้า',
          to: '/admin/customer',
          icon: 'mdi-account-group',
          nameRoute: ['admin-customer'],
          value: 'customer',
        },
        {
          text: 'ตัวแทน',
          to: '/admin/adviser',
          icon: 'mdi-account-tie-voice',
          nameRoute: ['admin-adviser'],
          value: 'adviser',
        },
        {
          text: 'ผู้ใช้',
          to: '/admin/user',
          icon: 'mdi-account',
          nameRoute: ['admin-user'],
          value: 'user',
        },
      ],
      fab: false,
      value: 'ลูกค้า',
      progress: false,
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
    auth() {
      return this.$store.state.auth
    },
  },
  created() {
    // console.log(this.auth.user)
    this.getRouteName()
  },
  methods: {
    async goTo(to) {
      // console.log(to)
      if (to === 'sign-out') {
        this.$refs.confirmDialog.dialog = true
        // await this.$auth.logout()
      } else if (to === 'refresh') {
        this.progress = true
        await this.$store.dispatch('fetchReceipts')
        await this.$store.dispatch('fetchCustomers')
        await this.$store.dispatch('fetchEmployees')
        await this.$store.dispatch('fetchItems')
        await this.$store.dispatch('fetchCategories')
        await this.$store.dispatch('fetchAdvisers')
        await this.$store.dispatch('fetchUsers')
        this.progress = false
        window.location.reload()
      } else {
        this.$router.push(to)
      }
    },
    getRouteName() {
      const route = this.nameRoute
      if (
        route === 'admin-report' ||
        route === 'admin-report-receipt' ||
        route === 'admin-report-category' ||
        route === 'admin-report-item'
      ) {
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
    showButton(value) {
      if (this.auth.loggedIn) {
        return this.auth.user.role.includes(value)
      } else {
        return false
      }
    },
  },
}
</script>
<style scoped></style>
