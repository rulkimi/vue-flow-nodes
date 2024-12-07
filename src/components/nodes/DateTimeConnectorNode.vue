<script setup lang="ts">
import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { capitalizeFirstLetter } from '../../utils';

const props = defineProps<{
  id: string
  data: {
    connectorType: 'success' | 'failure'
  }
}>();

const themeColor = ref('#f9511e')

const { getConnectedEdges } = useVueFlow()

const connectedEdges = getConnectedEdges(props.id);
const outputEdges = connectedEdges.filter(edge => edge.source === props.id);
for (const edge of outputEdges) {
  edge.style = {
    stroke: themeColor.value
  };
}
</script>

<template>
  <div class="font-bold bg-blue-500/15 rounded-lg text-blue-500 px-2 py-1">
    <span>{{ capitalizeFirstLetter(data.connectorType) }}</span>
  </div>
</template>
