<script setup lang="ts">
defineProps<{
  color?: string
  title: string | undefined
  description: string | undefined
  icon: string
}>();
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon
        :style="{ color: color }" 
        :icon="['far', icon]"
        size="xl"
      />
      <h2 class="text-2xl font-bold">
        <slot name="title">
          {{ title }}
        </slot>
      </h2>
    </div>

    <div class="border-b pb-2">
      <slot name="description">
        <span>{{ description }}</span>
      </slot>
    </div>

    <div class="mt-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>