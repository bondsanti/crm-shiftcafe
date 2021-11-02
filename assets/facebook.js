import Vue from 'vue'
if (process.client) {
  Vue.prototype.$facebook = window.FB
}
