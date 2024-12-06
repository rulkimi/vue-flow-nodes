<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { computed } from 'vue'

const props = defineProps<{
  id: string
  data: {
    name: string
    comment: string
  }
}>();
</script>

<template>
  <NodeBox :title="data.name" :description="data.comment" />
</template>
