<template>
  <div>
    <div>{{ slug }}</div>
    <NuxtLink href="/pageA">Go to page A</NuxtLink>
    <NuxtLink href="/pageB">Go to page B</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const title = await useFetch("/api/getTitle");
const slug = useRoute().params.slug;
useHead({
  title: title.data!.value + "-" + slug,
});
</script>

<style scoped></style>
