// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@atoms-studio/nuxt-swiftsearch"],
  build: {
    transpile: [
      "@atoms-studio/nuxt-swiftsearch",
      "algoliasearch",
      "algoliasearch-helper",
    ],
  },
  vite: {
    optimizeDeps: {
      include: ["@atoms-studio/nuxt-swiftsearch", "instantsearch.js"],
      exclude: ["fsevents", "globby"],
    },
  },
});
