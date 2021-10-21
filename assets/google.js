import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId:
    '945821486142-937b4569pe4ac78tc3knvtkfaul5bhf6.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true,
}
Vue.use(GAuth, gauthOption)
