<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue';

import { useVueFlow } from '@vue-flow/core';
import { useMainStore } from '../../stores';
import { computed, ref, watch } from 'vue';

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

const store = useMainStore();
const themeColor = ref('#ea487e');

const { getConnectedEdges } = useVueFlow();

const updateEdgeStyles = () => {
  const connectedEdges = getConnectedEdges(props.id);
  const outputEdges = connectedEdges.filter(edge => edge.source === props.id);

  for (const edge of outputEdges) {
    edge.style = {
      stroke: themeColor.value,
    };
  }
};

watch(
  () => store.edges, 
  () => {
    updateEdgeStyles();
  },
  { deep: true, immediate: true } 
);
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
