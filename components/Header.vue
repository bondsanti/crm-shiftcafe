<template>
  <div>
    <v-app-bar color="primary" dark fixed app
      ><v-spacer></v-spacer>
      <h3><v-icon left>mdi-check-circle-outline</v-icon> {{ title }}</h3>
      <v-spacer></v-spacer
    ></v-app-bar>

    <v-row justify="center" class="mt-15">
      <v-col align="center">
        <v-avatar color="orange" size="150    ">
          <img src=" /logo.ico" alt="John" />
        </v-avatar>
        <h2>SHIFT CAFÉ</h2>
      </v-col>
    </v-row>
    <v-row justify="center">Thank You</v-row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'สมัครสมาชิก',
    },
  },
}
</script>
