// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/algolia", "@atoms-studio/nuxt-swiftsearch"],
  algolia: {
    applicationId: process.env.id,
    apiKey: process.env.key,
  },
  experimental: {
    typedPages: true,
  },
});
