<template>
  <v-dialog v-model="dialog" width="500" transition="slide-y-transition">
    <v-app-bar color="grey lighten-1" elevation="4" dark>
      <Logo width="60" height="60" />
      <v-toolbar-title class="ml-3">{{ title }}</v-toolbar-title
      ><v-spacer></v-spacer>
    </v-app-bar>
  </v-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
  }),
}
</script>
<style scoped>
.v-dialog__content {
  align-items: flex-start;
  justify-content: flex-center;
}
</style>
