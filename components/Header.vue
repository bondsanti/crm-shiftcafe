<template>
  <div>
    <v-app-bar color="primary" dark fixed app
      ><v-spacer></v-spacer>
      <h2 class="mt-3 font-weight-regular">
        <v-icon left :size="iconSize">{{ icon }}</v-icon>
        {{ title }}
      </h2>
      <v-spacer></v-spacer
    ></v-app-bar>
    <v-system-bar v-show="systemBar" color="secondary" lights-out dark>
      <v-spacer></v-spacer>
      <v-btn x-small rounded color="primary">รายงาน</v-btn>
      <v-btn x-small rounded color="primary">ลูกค้า</v-btn>

      <span>12:30</span>
      <v-spacer></v-spacer>
    </v-system-bar>
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
