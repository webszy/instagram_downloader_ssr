const info=require('./assets/content/seo')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: info.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content:info.description },
      { hid: 'keywords', name: 'keywords', content: info.keywords },
      { name:'og:site_name',property:'og:site_name',content:''},
      { name:'og:title',property:'og:type',content:''},
      { name:'og:url',property:'og:url',content:'https://'},
      { name:'og:description',property:'og:description',content:''},
      { name:'og:image',property:'og:image',content:'https://'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/css/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'video.js/dist/video-js.css',
     './assets/css/common.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/videopPlayer'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
     postcss:{
      autoprefixer:{
        grid: true
      }
    },
    performance:{
    gzip:true,
    threshold:10240,
    prefetch:true
    },
    cache: true
  }
}
