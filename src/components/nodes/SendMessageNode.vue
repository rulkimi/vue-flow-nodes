<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { computed } from 'vue'

const props = defineProps<{
  id: string
  data: {
    name: string
    payload: Array<{
      type: 'text' | 'attachment'
      text: string
    }>
  }
}>();
</script>

<template>
  <NodeBox :title="data.name" icon="paper-plane">
    <template #description>
      <div
        v-for="item in data.payload"
      >
        <div>Message:</div>
        <div class="italic">{{ item.text }}</div>
      </div>
    </template>
  </NodeBox>
</template>
