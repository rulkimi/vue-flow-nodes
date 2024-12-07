<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  icon?: string
  iconColor?: string
}>();
</script>

<template>
  <div class="bg-white border rounded-2xl shadow-md w-60">
    <div class="border-b p-3 flex items-center gap-2 font-semibold">
      <font-awesome-icon
        v-if="icon"
        :icon="['far', icon]"
        :style="{ color: iconColor }"
      />
      <div>{{ title }}</div>
    </div>
    <div class="p-3 break-words">
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</template>