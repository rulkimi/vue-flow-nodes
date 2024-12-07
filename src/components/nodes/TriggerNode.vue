<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { useVueFlow } from '@vue-flow/core'
import { useMainStore } from '../../stores';
import { computed, ref } from 'vue'

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

const store = useMainStore()
const themeColor = ref('#ea487e')

const { getConnectedEdges } = useVueFlow()

const connectedEdges = getConnectedEdges(props.id);
const outputEdges = connectedEdges.filter(edge => edge.source === props.id);
for (const edge of outputEdges) {
  edge.style = {
    stroke: themeColor.value
  };
}

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
    icon="lightbulb"
    :icon-color="themeColor"
    :border-color="store.activeNodeId === id ? themeColor: ''"
  />
</template>
