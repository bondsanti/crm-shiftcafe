<template>
  <div style="height: 100%">
    <Header :title="`${error.statusCode}`" icon="mdi-alert" />
    <v-row class="fill-height mx-2" justify="center" align="center">
      <v-col align="center">
        <v-row justify="center">
          <v-avatar color="orange" :size="iconSize">
            <img src=" /logo.ico" alt="John" />
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <h1
            id="font"
            class="display-4"
            :class="{
              'display-1': $vuetify.breakpoint.xs,
              'display-2': $vuetify.breakpoint.sm,
              'display-3': $vuetify.breakpoint.md,
            }"
          >
            {{ error.statusCode }}
          </h1>
        </v-row>
        <v-row justify="center" class="my-2">
          <h1
            id="font"
            class="display-3"
            :class="{
              title: $vuetify.breakpoint.xs,
              'display-1': $vuetify.breakpoint.sm,
              'display-2': $vuetify.breakpoint.md,
            }"
          >
            {{ error.message }}
          </h1>
        </v-row>
        <v-row justify="center" class="mt-5">
          <v-btn
            class="mr-1"
            color="primary"
            outlined
            x-large
            @click="$router.go(-1)"
            ><v-icon x-large left>mdi-arrow-left-box</v-icon>ย้อนกลับ</v-btn
          >
          <v-btn
            v-show="refreshBtn"
            class="ml-1"
            color="primary"
            outlined
            x-large
            @click="refresh"
            >โหลดอีกครั้ง<v-icon x-large right
              >mdi-refresh-circle</v-icon
            ></v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'default2',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      refreshBtn: true,
    }
  },

  head() {
    const title = this.error.statusCode + ' ' + this.error.message
    return {
      title,
    }
  },
  computed: {
    iconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 60
        case 'sm':
          return 80
        default:
          return 150
      }
    },
  },
  created() {
    // console.log(this.error)
    this.showRefreshButton()
    // console.log(this.refreshBtn)
  },
  methods: {
    refresh() {
      // this.$nuxt.refresh()
      window.location.reload()
    },
    showRefreshButton() {
      if (this.error.statusCode === 404 || this.error.statusCode === '401') {
        this.refreshBtn = false
      } else {
        this.refreshBtn = true
      }
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
#font {
  font-family: 'Mitr', sans-serif !important;
}
</style>
