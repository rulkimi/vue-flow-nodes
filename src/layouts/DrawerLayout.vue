<script setup lang="ts">
import { computed, useSlots } from 'vue';

defineProps<{
  color?: string
  title: string | undefined
  description: string | undefined
  icon: string
}>();

const slot = useSlots()
const hasTopContent = computed(() => !!slot['top-content']);
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

    <div v-if="hasTopContent" class="mt-4">
      <slot name="top-content"></slot>
    </div>

    <div class="mt-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>