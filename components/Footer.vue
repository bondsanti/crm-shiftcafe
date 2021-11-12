<template>
  <v-footer :color="color" padless app height="60">
    <v-row justify="center" align="center">
      <v-col align="right" cols="4" class="py-0 white--text">
        <Logo height="58" width="60" />
      </v-col>
      <v-col align="center" cols="8" class="py-0 white--text">
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
