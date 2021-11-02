import Vue from 'vue'
if (process.client) {
  Vue.prototype.$liff = window.liff
}
