<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { computed } from 'vue'

const props = defineProps<{
  id: string
  data: {
    timezone: string
    action: string
  }
}>();

const description = computed(() => {
  let action;
  switch (props.data.action) {
    case "businessHours":
      action = 'Business Hours';
      break;
  
    default:
      break;
  }
  return `${action} - ${props.data.timezone}`
});
</script>

<template>
  <NodeBox :title="data.name" :description="description" />
</template>
