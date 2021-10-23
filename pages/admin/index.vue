<template>
  <div style="height: 100%">
    <Header title="เข้าสู่ระบบ" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="1" sm="2" md="3" lg="4"></v-col>
      <v-col cols="10" sm="8" md="6" lg="4" align="center">
        <v-row align="center">
          <v-col cols="4" justify="start" class="pt-0">
            <v-img height="100%" width="100%" src="/logo.ico"> </v-img>
          </v-col>
          <v-col cols="8">
            <v-row>
              <Input label="Username" />
            </v-row>
            <v-row>
              <Input type="password" label="Password" />
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-btn rounded block color="primary">เข้าสู่ระบบ</v-btn>
        </v-row>
      </v-col>
      <v-col cols="1" sm="2" md="3" lg="4"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'SING IN',
    }
  },
}
</script>
