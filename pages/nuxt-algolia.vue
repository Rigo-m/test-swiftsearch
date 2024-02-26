<template>
  <div>
    <AisInstantSearch :widgets :configuration>
      <AisStats />
      <!-- <AisSearchBox /> -->
      <AisSortBy />
      <AisToggleRefinement attribute="free_shipping" />
      <AisInfiniteHits />
      <AisRefinementList attribute="brand" searchable />
      <AisIndex index="airbnb">
        <AisInfiniteHits />
      </AisIndex>
    </AisInstantSearch>
  </div>
</template>

<script setup lang="ts">
const client = useAlgoliaRef();
const algoliaRouter = useAisRouter();

const indexBnb = useAisIndex({
  indexName: "airbnb",
});
indexBnb.addWidgets([useAisInfiniteHits({})]);

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
      query: "a",
    },
  }),
  // useAisSearchBox({}),
  indexBnb,
]);

const configuration = ref({
  indexName: "instant_search",
  routing: algoliaRouter.value,
  searchClient: client,
});
</script>

<style scoped></style>
