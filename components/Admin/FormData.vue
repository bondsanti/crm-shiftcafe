<template>
  <v-navigation-drawer v-model="drawer" app bottom temporary width="350" fixed>
    <v-app-bar color="grey darken-2" elevation="4"
      ><v-btn small fab color="grey darken-1" @click="drawer = false"
        ><v-icon>mdi-close</v-icon></v-btn
      ><v-spacer></v-spacer> <Logo width="60" height="60" />
      <v-spacer></v-spacer
      ><v-btn
        :disabled="!valid"
        small
        fab
        color="primary"
        @click="formatDataBeforeSend"
        ><v-icon>{{
          type === 'add' ? 'mdi-content-save' : 'mdi-pencil'
        }}</v-icon></v-btn
      ></v-app-bar
    >
    <v-container>
      <v-form ref="form" v-model="valid" class="ma-2">
        <v-row justify="center" class="mb-3"
          ><h2>
            {{ type === 'add' ? 'เพิ่มข้อมูล' : 'แก้ไขข้อมูล' }} {{ title }}
          </h2></v-row
        >
        <v-row v-if="showDate">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateText"
                label="วันที่"
                append-icon="mdi-calendar"
                rounded
                filled
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable locale="th">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                ยกเลิก
              </v-btn>
              <v-btn color="primary" @click="$refs.dialog.save(date)">
                ตกลง
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-row>
        <v-row v-for="(item, i) in inputData.input" :key="i" justify="center">
          <v-text-field
            v-model="item.value"
            :label="item.label"
            :append-icon="item.icon"
            :rules="item.rules"
            rounded
            filled
          ></v-text-field>
        </v-row>
        <v-row v-if="showDetail">
          <v-textarea
            v-model.lazy="detail"
            rounded
            filled
            append-icon="mdi-note-text"
            label="รายละเอียด รายจ่าย"
            rows="3"
          ></v-textarea>
        </v-row>
        <v-row
          v-for="item in inputData.select"
          :key="item.label"
          justify="center"
        >
          <v-select
            v-model="item.value"
            filled
            :multiple="item.multiple"
            :prepend-inner-icon="item.icon"
            :label="item.label"
            :items="item.items"
            rounded
          ></v-select>
        </v-row>
      </v-form>
    </v-container>
    <Footer class="hidden-md-and-down" color="grey darken-2" />
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
    showDate: {
      type: Boolean,
      default: false,
    },
    showDetail: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    drawer: false,
    valid: true,
    modal: false,
    detail: '',
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  computed: {
    dateText() {
      return this.$options.filters.dateTh(this.date)
    },
  },
  methods: {
    formatDataBeforeSend() {
      const obj = {
        ...this.inputData,
        ...(this.showDate && { date: this.date }),
        ...(this.showDetail && { detail: this.detail }),
      }
      this.$emit('sendData', obj)
    },
  },
}
</script>
