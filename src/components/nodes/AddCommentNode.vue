<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue';

import { ref, watch } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import { useMainStore } from '../../stores';

const props = defineProps<{
  id: string
  data: {
    name: string
    comment: string
  }
}>();

const store = useMainStore();
const themeColor = ref('#8b93d0');

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
    :description="data.comment"
    icon="comment-dots"
    :icon-color="themeColor"
    :border-color="store.activeNodeId === id ? themeColor: ''"
  />
</template>
