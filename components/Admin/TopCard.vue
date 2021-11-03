<template>
  <v-hover v-slot="{ hover }" close-delay="100">
    <v-card
      color="primary"
      dark
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-col align="center" align-self="center">
          <h2 class="font-weight-regular">{{ title }}</h2>

          <h1>1</h1>
        </v-col>

        <v-avatar class="ma-3" size="125" tile>
          <v-icon size="100" color="warning">{{ icon }}</v-icon>
        </v-avatar>
      </div>
    </v-card>
  </v-hover>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'mdi-cash',
    },
  },
}
</script>
<style scoped>
.v-card.on-hover.theme--dark {
  background-color: rgba(255, 255, 255, 0.8);
}
.v-card.on-hover.theme--dark > .v-card__text {
  color: #000;
}
</style>
