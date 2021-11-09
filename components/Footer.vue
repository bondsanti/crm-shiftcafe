<template>
  <v-footer :color="color" padless app>
    <v-row justify="center" align="center">
      <v-col align="right" cols="4" class="py-4 white--text">
        <Logo height="80" width="80" />
      </v-col>
      <v-col align="center" cols="8" class="py-4 white--text">
        <h1 class="font-weight-regular">SHIFT CAFÉ</h1>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
