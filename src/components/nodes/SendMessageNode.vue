<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { computed, ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'

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

const themeColor = ref('#3baca1')

const { updateNodeData, getConnectedEdges } = useVueFlow()

const connectedEdges = getConnectedEdges(props.id);
const outputEdges = connectedEdges.filter(edge => edge.source === props.id);
for (const edge of outputEdges) {
  edge.style = {
    stroke: themeColor.value
  };
}
</script>

<template>
  <NodeBox
    :title="data.name"
    icon="paper-plane"
    :icon-color="themeColor"
  >
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
