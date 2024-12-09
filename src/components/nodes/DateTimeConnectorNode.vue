<script setup lang="ts">
import { ref, watch } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import { capitalizeFirstLetter } from '../../utils';
import { useMainStore } from '../../stores';

const props = defineProps<{
  id: string;
  data: {
    connectorType: 'success' | 'failure';
  };
}>();

const store = useMainStore();
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
  <div class="font-bold bg-blue-500/15 rounded-lg text-blue-500 px-2 py-1">
    <span>{{ capitalizeFirstLetter(data.connectorType) }}</span>
  </div>
</template>
