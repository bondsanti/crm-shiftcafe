<template>
  <v-app dark>
    <v-main>
      <Header
        :title="`${auth.user.username}`"
        system-bar
        icon="mdi-chart-box"
        prominent
        dense
      />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.state.auth
    },
  },
}
</script>
<style>
html {
  font-family: 'Mitr', sans-serif;
}

#app {
  font-family: 'Mitr', sans-serif;
}
.home-enter-active,
.home-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 350ms;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}
</style>
