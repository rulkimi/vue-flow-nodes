<script setup lang="ts">
import { ref } from 'vue';
import { useVueFlow } from '@vue-flow/core';

const props = defineProps<{
  id: string
}>();

const themeColor = ref('green');

const { getConnectedEdges } = useVueFlow();

const connectedEdges = getConnectedEdges(props.id);
const outputEdges = connectedEdges.filter(edge => edge.source === props.id);
for (const edge of outputEdges) {
  edge.style = {
    stroke: themeColor.value
  };
};
</script>

<template>
  <div class="w-60 invisible">EMPTY NODE</div>
</template>
