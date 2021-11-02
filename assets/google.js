import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId:
    '508230146310-b0cp0mgekk3to3gvse5qf52hk4h6dvt6.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true,
}
Vue.use(GAuth, gauthOption)
