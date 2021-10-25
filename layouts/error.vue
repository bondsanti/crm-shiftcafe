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
        <v-row justify="center">
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
        <v-row justify="center">
          <v-btn color="primary" x-large icon fab @click="$router.go(-1)"
            ><v-icon>mdi-home</v-icon></v-btn
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
