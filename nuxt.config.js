import colors from 'vuetify/es5/util/colors'

export default {
  serverMiddleware: ['@/server/index.js'],
  target: 'server',
  ssr: false,
  loading: {
    color: 'white',
    height: '10px',
    continuous: true,
  },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#000',
    background: 'white',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'SHIFT CAFÉ | %s',
    title: 'WELCOME',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'SHIFT CAFÉ at LAMPANG',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: ' theme-color', content: colors.shades.black },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap',
      },
    ],
    script: [
      { src: 'https://static.line-scdn.net/liff/edge/2.1/sdk.js' },
      { src: 'https://connect.facebook.net/en_US/sdk.js' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/assets/liff.js', '@/assets/facebook.js', '@/assets/google.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: 'http://localhost:3000/server',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.shades.black,
          accent: colors.grey.darken3,
          secondary: colors.grey.lighten1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.red.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
