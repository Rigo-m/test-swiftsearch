// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/algolia", "@atoms-studio/nuxt-swiftsearch"],
  algolia: {
    applicationId: "latency",
    apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
  },
  experimental: {
    typedPages: true,
  },
});
