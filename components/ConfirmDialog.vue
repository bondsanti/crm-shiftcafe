<template>
  <v-dialog v-model="dialog" width="500" transition="slide-x-transition">
    <v-app-bar color="grey darken-2" elevation="4" dark>
      <Logo width="60" height="60" />
      <v-toolbar-title class="ml-3">{{ title }}</v-toolbar-title
      ><v-spacer></v-spacer>
    </v-app-bar>
    <v-card height="100">
      <v-row no-gutters style="height: 100%" align="center" class="pa-3">
        <v-col align="center" class="pr-2">
          <v-btn color="primary" block outlined @click="dialog = false"
            >ไม่ใช่</v-btn
          >
        </v-col>
        <v-col align="center">
          <v-btn color="primary" block class="pl-2" @click="$emit('confirm')"
            >ใช่</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
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
  justify-content: flex-end;
}
</style>
