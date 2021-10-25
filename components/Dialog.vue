<template>
  <v-row no-gutters>
    <v-dialog
      v-model="dialog"
      width="100%"
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-row class="ma-0">
        <v-col style="background-color: #000; border: 5px solid black">
          <v-row justify="center" class="my-2"
            ><h3 class="white--text">กรุณากรอกหมายเลขโทรศัพท์</h3></v-row
          >
          <v-row style="background-color: #fff" justify="center">
            <v-form
              ref="form"
              v-model="valid"
              style="width: 100%"
              @submit.prevent="comfirm"
            >
              <v-col align="center">
                <Input
                  v-model="telephone"
                  label="หมายเลขโทรศัพท์"
                  class="mt-3"
                  icon="mdi-cellphone"
                  :rules="telephoneRules"
                />
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  :loading="btnLoading"
                  rounded
                  block
                  color="primary"
                  >ยืนยัน</v-btn
                >
              </v-col>
            </v-form>
          </v-row>
          <v-row
            v-show="error"
            class="py-2"
            justify="center"
            style="background-color: red"
            ><h3 class="white--text">
              <v-icon dark>mdi-alert</v-icon> ไม่มีหมายเลขนี้ในระบบ
            </h3></v-row
          >
        </v-col>
      </v-row>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    btnLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      dialog: false,
      telephone: '',
      telephoneRules: [
        (v) => !!v || 'กรุณากรอกหมายเลขโทรศัพท์',
        (v) => v.length === 10 || 'หมายเลขโทรศัพท์ไม่ถูกต้อง',
        (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
    }
  },
  methods: {
    comfirm() {
      this.$emit('confirmDialog', this.telephone)
    },
  },
}
</script>
<style scoped>
.v-dialog__content {
  align-items: flex-center;
  justify-content: flex-center;
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .v-dialog__content {
    align-items: flex-end;
    justify-content: flex-center;
  }
}
</style>
