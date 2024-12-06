<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { useVueFlow } from '@vue-flow/core'

import { computed } from 'vue'

const props = defineProps<{
  id: string
  data: {
    type: string
    oncePerContact: boolean
  }
}>();

const description = computed(() => {
  switch (props.data.type) {
    case "conversationOpened":
      return 'Conversation Opened'
      break;
  
    default:
      break;
  }
});

// const { updateNodeData, getConnectedEdges } = useVueFlow()

// function onSelect(color) {
//   updateNodeData(props.id, { color, isGradient: false })

//   const connectedEdges = getConnectedEdges(props.id)
//   for (const edge of connectedEdges) {
//     edge.style = {
//       stroke: color,
//     }
//   }
// }
</script>

<template>
  <NodeBox 
    title="Trigger"
    :description="description"
    icon="bolt"
  />
</template>
