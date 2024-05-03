<template>
  <div>
    <NuxtLink to="nuxt-algolia">Go to nuxt algolia</NuxtLink>
    <AisInstantSearch :widgets :configuration>
      <SearchComponent></SearchComponent>
    </AisInstantSearch>
  </div>
</template>

<script setup lang="ts">
import type { InstantSearchOptions } from "instantsearch.js";

const client = useAlgoliaRef();

const algoliaRouter = useCustomRouting();

const widgets = computed(() => [
  useAisSortBy({
    items: [
      {
        value: `TOP_PRODUCTS`,
        label: "Miglior risultato",
      },
      {
        value: `TOP_PRODUCTS_discount-desc`,
        label: "Sconto decrescente",
      },
      {
        value: `TOP_PRODUCTS_name-asc`,
        label: "Nome prodotto A-Z",
      },
      {
        value: `TOP_PRODUCTS_name-desc`,
        label: "Nome prodotto Z-A",
      },
      {
        value: `TOP_PRODUCTS_price-asc`,
        label: "Prezzo crescente",
      },
      {
        value: `TOP_PRODUCTS_price-desc`,
        label: "Prezzo decrescente",
      },
    ],
  }),
  useAisStats({}),
  useAisInfiniteHits({ showPrevious: true }),
  useAisRefinementList({
    attribute: "brand.name",
    showMore: true,
  }),
  useAisClearRefinements({ includedAttributes: ["brand.name"] }, "brand"),
  // useAisSearchBox({}),
]);

const stateMapping = useStateMapping();

const configuration = ref<InstantSearchOptions>({
  indexName: "TOP_PRODUCTS",
  routing: {
    router: algoliaRouter.value.router,
    stateMapping: stateMapping("TOP_PRODUCTS"),
  },
  searchClient: client,
});
</script>

<style scoped></style>
