import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/th'
if (process.client) {
  Vue.prototype.$liff = window.liff
}

moment().format('LLLL')
Vue.filter('dateTh', function (value) {
  if (!value) return ''
  const strdate = moment(value).add(543, 'years')
  return moment(strdate).format('D MMMM YYYY H:mm')
  // value = value.toString()
})
