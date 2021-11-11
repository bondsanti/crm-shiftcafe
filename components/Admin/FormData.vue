<template>
  <v-navigation-drawer v-model="drawer" app bottom temporary width="350" fixed>
    <v-app-bar color="grey darken-2" elevation="4"
      ><v-btn small fab color="grey darken-1" @click="drawer = false"
        ><v-icon>mdi-close</v-icon></v-btn
      ><v-spacer></v-spacer> <Logo width="60" height="60" />
      <v-spacer></v-spacer
      ><v-btn small fab color="primary" @click="$emit('sendData', inputData)"
        ><v-icon>mdi-content-save</v-icon></v-btn
      ></v-app-bar
    >
    <v-container>
      <v-form class="ma-2">
        <v-row justify="center" class="mb-3"
          ><h2>
            {{ type === 'add' ? 'เพิ่มข้อมูล' : 'แก้ไขข้อมูล' }} {{ title }}
          </h2></v-row
        >
        <v-row v-for="(item, i) in inputData.input" :key="i" justify="center">
          <v-text-field
            v-model="item.value"
            :label="item.label"
            :append-icon="item.icon"
            rounded
            filled
          ></v-text-field>
        </v-row>
        <v-row
          v-for="item in inputData.select"
          :key="item.label"
          justify="center"
        >
          <v-select
            v-model="item.value"
            filled
            :label="item.label"
            :items="item.items"
            rounded
          ></v-select>
        </v-row>
      </v-form>
    </v-container>
    <Footer class="hidden-sm-and-down" color="grey darken-2" />
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    inputData: {
      type: Object,
      default: () => ({
        input: [],
        select: [],
      }),
    },
    type: {
      type: String,
      default: 'add',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    formatDataBeforeSend() {
      // let obj = new Object()
      // if(this.inputData.input.length !== 0){
      //   this.inputData.input.map(in=>{
      //   })
      // }
      // this.$emit('sendData', this.inputData)
    },
  },
}
</script>
