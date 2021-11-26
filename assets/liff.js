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
  return moment(strdate).format('D MMMM YYYY')
  // value = value.toString()
})

Vue.filter('dateThWithTime', function (value) {
  if (!value) return '-'
  const strdate = moment(value).add(543, 'years')
  return moment(strdate).format('D MMMM YYYY H:mm')
  // value = value.toString()
})

Vue.filter('currency', function (value) {
  if (!value) return '0'
  const thai = new Intl.NumberFormat('th', {
    style: 'currency',
    currency: 'THB',
  }).format(value)
  return thai
  // value = value.toString()
})

Vue.filter('unFormatCurrency', function (value) {
  if (!value) return '0'
  value = value.replace('฿', '')
  value = value.replace(',', '')
  value = parseFloat(value)
  return value
})

Vue.filter('comma', function (value, num = 0) {
  if (!value) return '0'
  const res = parseInt(value)
  const val = (res / 1).toFixed(num).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})
