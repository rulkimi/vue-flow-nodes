<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue';

import { computed, ref, watch } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import { useMainStore } from '../../stores';

const props = defineProps<{
  id: string
  data: {
    name: string
    timezone: string
    action: string
  }
}>();

const store = useMainStore();

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

const themeColor = ref('#f9511e');

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
    :title="data.name"
    :description="description"
    icon="calendar-days"
    :icon-color="themeColor"
    :border-color="store.activeNodeId === id ? themeColor: ''"
  />
</template>
