<template>
  <div>
    <v-app-bar color="primary" dark fixed app
      ><v-spacer></v-spacer>
      <h3>สมัครสมาชิก</h3>
      <v-spacer></v-spacer
    ></v-app-bar>
    <v-row justify="center" align="center" class="mt-0">
      <v-col align="center">
        <v-avatar color="orange" size="100">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <h3>testname testLastName</h3>
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-col cols="1"></v-col>
      <v-col cols="10" align="center">
        <v-row>
          <Input label="ชื่อ-นามสกุล" icon="mdi-account" />
        </v-row>
        <v-row>
          <Input label="อีเมลล์" icon="mdi-email" />
        </v-row>
        <v-row>
          <Input label="เบอร์โทรศัพท์" icon="mdi-cellphone" />
        </v-row>
        <v-row>
          <Input label="ที่อยู่" icon="mdi-map-marker" />
        </v-row>
        <v-row>
          <v-col class="ma-0 pa-0 pr-1">
            <Select label="จังหวัด" icon="mdi-island" />
          </v-col>
          <v-col class="ma-0 pa-0 pl-1">
            <Select label="อำเภอ" icon="mdi-subway-variant" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ma-0 pa-0 pr-1">
            <Select label="ตำบล" icon="mdi-elephant" />
          </v-col>
          <v-col class="ma-0 pa-0 pl-1">
            <Input label="รหัสไปรษณีย์" icon="mdi-qrcode-edit" />
          </v-col>
        </v-row>
        <v-row>
          <v-btn x-large block color="primary" rounded>บันทึก</v-btn>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-footer color="primary lighten-1" padless app>
      <v-row justify="center" align="center" no-gutters>
        <v-col align="right" cols="4" class="py-4 white--text">
          <Logo height="80" width="80" />
        </v-col>
        <v-col align="center" cols="8" class="py-4 white--text">
          <h1>SHIFT CAFÉ</h1>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
    }
  },
}
</script>
<style>
div {
  font-family: 'Mitr', sans-serif;
}

.v-input__control input {
  text-align: center;
}
</style>
