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
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10" align="center">
        <v-row>
          <Input label="ชื่อ-นามสกุล" icon="mdi-map-marker" />
        </v-row>
        <v-row>
          <Input label="อีเมลล์" icon="mdi-map-marker" />
        </v-row>
        <v-row>
          <Input label="เบอร์โทรศัพท์" icon="mdi-map-marker" />
        </v-row>
        <v-row>
          <Input label="ที่อยู่" icon="mdi-map-marker" />
        </v-row>
        <v-row>
          <v-col class="ma-0 pa-0 pr-1">
            <Select label="จังหวัด" icon="mdi-map" />
          </v-col>
          <v-col class="ma-0 pa-0 pl-1">
            <Select label="อำเภอ" icon="mdi-map" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ma-0 pa-0 pr-1">
            <Select label="ตำบล" icon="mdi-map" />
          </v-col>
          <v-col class="ma-0 pa-0 pl-1">
            <Input label="รหัสไปรษณีย์" icon="mdi-map-marker" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-footer color="primary lighten-1" padless app>
      <v-row justify="center" no-gutters>
        <v-btn color="white" text rounded class="my-2"> บันทึก </v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
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
