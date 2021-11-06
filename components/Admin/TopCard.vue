<template>
  <v-hover v-slot="{ hover }" close-delay="100">
    <v-card
      :color="routeName === $route.name ? 'warning' : 'primary'"
      dark
      class="cursor"
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      @click="$router.push(to)"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-col align="center" align-self="center">
          <h2 class="font-weight-regular">{{ title }}</h2>
        </v-col>

        <v-avatar class="ma-3 ml-0 pa-0" size="125" tile>
          <v-icon
            size="100"
            :color="routeName === $route.name ? 'primary' : 'warning'"
            >{{ icon }}</v-icon
          >
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
    routeName: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  },
  created() {
    console.log(this.$route.name)
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
.cursor:hover {
  cursor: pointer;
}
</style>
