<script setup lang="ts">
const props = defineProps<{
  icon?: string
  title: string
  description: string
}>();
</script>

<template>
  <div class="bg-white border rounded-lg shadow-md w-60">
    <div class="border-b p-3 font-semibold">{{ title }}</div>
    <div class="p-3">{{ description }}</div>
  </div>
</template>