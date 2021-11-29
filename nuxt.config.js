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
        content:
          'shift café บริการ เครื่องดื่มและอาหาร ตั้งอยู่ที่ 89/1 ถนน สุขสวัสดิ์ 4 เมือง ลำปาง 52000 โทร 091-796-1816',
      },
      // { name: 'format-detection', content: 'telephone=no' },
      { name: ' theme-color', content: colors.shades.black },
      {
        property: 'og:image',
        name: 'og:image',
        content: 'https://app.shift-cafe.com/cover.jpg',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://app.shift-cafe.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'CRM SHIFT CAFÉ',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'shift café บริการ เครื่องดื่มและอาหาร ตั้งอยู่ที่ 89/1 ถนน สุขสวัสดิ์ 4 เมือง ลำปาง 52000 โทร 091-796-1816',
      },
      { property: 'og:image:width', content: '740' },
      { property: 'og:image:height', content: '300' },
      {
        property: 'apple-mobile-web-app-capable',
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        property: 'mobile-web-app-capable',
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://app.shift-cafe.com',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content:
          'shift café บริการ เครื่องดื่มและอาหาร ตั้งอยู่ที่ 89/1 ถนน สุขสวัสดิ์ 4 เมือง ลำปาง 52000 โทร 091-796-1816',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'shift café บริการ เครื่องดื่มและอาหาร ตั้งอยู่ที่ 89/1 ถนน สุขสวัสดิ์ 4 เมือง ลำปาง 52000 โทร 091-796-1816',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://app.shift-cafe.com/cover.jpg',
      },
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
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  axios: {
    baseURL: 'http://localhost:3000/server',
    // baseURL: 'https://shiftcafe.th.app.ruk-com.cloud/server',
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            method: 'post',
            url: 'user/signin',
            propertyName: 'token',
          },
          user: {
            method: 'get',
            url: 'user/me ',
            propertyName: 'user',
          },
          logout: false,
        },
      },
    },
    redirect: {
      login: '/admin',
      logout: '/admin',
      home: '/admin',
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['vue-toastification/nuxt'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.shades.black,
          accent: colors.grey.darken3,
          secondary: colors.grey.lighten1,
          info: colors.teal.lighten1,
          warning: '#f7ce68',
          error: colors.red.accent4,
          success: colors.green.accent3,
          white: colors.shades.white,
        },
      },
    },
  },
  pwa: {
    icon: false,
    meta: {
      description:
        'shift café บริการ เครื่องดื่มและอาหาร ตั้งอยู่ที่ 89/1 ถนน สุขสวัสดิ์ 4 เมือง ลำปาง 52000 โทร 091-796-1816',
    },
    manifest: {
      name: 'SHIFT CAFÉ',
      lang: 'th',
      useWebmanifestExtension: false,
      theme_color: colors.shades.black,
      description:
        'shift café บริการ เครื่องดื่มและอาหาร ตั้งอยู่ที่ 89/1 ถนน สุขสวัสดิ์ 4 เมือง ลำปาง 52000 โทร 091-796-1816',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
}
