// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/sitemap"
  ],
  css: ["@/assets/css/global.css", "@/assets/css/skeleton.css", "vue-toast-notification/dist/theme-sugar.css"],
  pinia: {
    // autoImports: [
    //   // automatically imports `defineStore`
    //   'defineStore', // import { defineStore } from 'pinia'
    //   ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    // ],
  },
  imports: {
    autoImport: false,
  },

});
