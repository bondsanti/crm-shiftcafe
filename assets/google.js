import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId:
    '508230146310-2jl3r6p1s45j6vt2530fcurml1jrgg11.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true,
}
Vue.use(GAuth, gauthOption)
