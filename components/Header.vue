<template>
  <v-app-bar color="primary" dark fixed app
    ><v-spacer></v-spacer>
    <h2 class="mt-3">
      <v-icon left :size="iconSize">{{ icon }}</v-icon>
      {{ title }}
    </h2>
    <v-spacer></v-spacer
  ></v-app-bar>
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
  },
  computed: {
    iconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 30
        case 'sm':
          return 45
        default:
          return 60
      }
    },
  },
}
</script>
