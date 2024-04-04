<template>
  <div>
    <!-- <AisSearchBox /> -->
    <AisSortBy />
    <AisToggleRefinement attribute="free_shipping" />
    <AisInfiniteHits />
    <AisRefinementList attribute="brand" searchable />
  </div>
</template>

<script setup lang="ts">
const { getInstance } = useInstantSearch();
const instance = getInstance();
if (!instance.value.mainIndex.getResults()?.hits?.length) {
  throw createError({
    statusCode: 500,
  });
}
</script>

<style scoped></style>
