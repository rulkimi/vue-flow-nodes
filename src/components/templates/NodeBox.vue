<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  icon?: string
}>();
</script>

<template>
  <div class="bg-white border rounded-2xl shadow-md w-60">
    <div class="border-b p-3 flex items-center gap-2 font-semibold">
      <font-awesome-icon v-if="icon" :icon="['fas', icon]" />
      <div>{{ title }}</div>
    </div>
    <div class="p-3">
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</template>