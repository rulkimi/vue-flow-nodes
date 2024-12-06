<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { computed, ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'

const props = defineProps<{
  id: string
  data: {
    name: string
    comment: string
  }
}>();

const themeColor = ref('#8b93d0')

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
    :description="data.comment"
    icon="comment-dots"
    :icon-color="themeColor"
  />
</template>
