<template>
  <div>
    <NuxtLink to="nuxt-algolia">Go to nuxt algolia</NuxtLink>
    <AisInstantSearch :widgets :configuration>
      <SearchComponent></SearchComponent>
    </AisInstantSearch>
  </div>
</template>

<script setup lang="ts">
import algoliasearch from "algoliasearch";
import type { InstantSearchOptions } from "instantsearch.js";

const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
const algoliaRouter = useCustomRouting();

const widgets = computed(() => [
  useAisSortBy({
    items: [
      { value: "instant_search", label: "Default" },
      { value: "instant_search_price_asc", label: "Price asc." },
      { value: "instant_search_price_desc", label: "Price desc." },
    ],
  }),
  useAisStats({}),
  useAisInfiniteHits({ showPrevious: true }),
  useAisRefinementList({
    attribute: "brand",
    showMore: true,
  }),
  useAisClearRefinements({ includedAttributes: ["brand"] }, "brand"),
  useAisToggleRefinement({ attribute: "free_shipping" }),
  useAisConfigure({
    searchParameters: {
      query: "a",
    },
  }),
  // useAisSearchBox({}),
]);

const stateMapping = useStateMapping();

const configuration = ref<InstantSearchOptions>({
  indexName: "instant_search",
  routing: {
    router: algoliaRouter.value.router,
    stateMapping: stateMapping("instant_search"),
  },
  searchClient: client,
});
</script>

<style scoped></style>
