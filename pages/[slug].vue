<template>
  <div>
    <div>{{ slug }}</div>
    <NuxtLink href="/samsung">Go to samsung</NuxtLink>
    <NuxtLink href="/apple">Go to apple</NuxtLink>
    <AisInstantSearch :widgets :configuration>
      <SearchComponent></SearchComponent>
    </AisInstantSearch>
    <NuxtLink href="/samsung">Go to samsung</NuxtLink>
    <NuxtLink href="/apple">Go to apple</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const title = await useFetch("/api/getTitle");
const slug = useRoute("slug").params.slug;
useHead({
  title: title.data!.value + "-" + slug,
});
import algoliasearch from "algoliasearch";
import type { InstantSearchOptions } from "instantsearch.js";

const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
const algoliaRouter = useAisRouter();

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
  useAisToggleRefinement({ attribute: "free_shipping" }),
  useAisConfigure({
    searchParameters: {
      filters: `brand:${slug}`,
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
