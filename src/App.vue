<script setup lang="ts">
import { ref } from 'vue';

import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';

import EdgeWithButton from '~/components/EdgeWithButton.vue';

const initialNodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 0 },
    class: 'light',
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
    class: 'light',
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
    class: 'light',
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 150, y: 200 },
    class: 'light',
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Node 5' },
    position: { x: 300, y: 300 },
    class: 'light',
  },
]);

const initialEdges = ref([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'button',
  },
  {
    id: 'e1-3',
    type: 'button',
    source: '1',
    target: '3',
  },
  {
    id: 'e4-5',
    type: 'button',
    source: '4',
    target: '5',
  },
  {
    id: 'e3-4',
    type: 'button',
    source: '3',
    target: '4',
  },
]);
</script>

<template>
  <VueFlow :nodes="initialNodes" :edges="initialEdges" fit-view-on-init>
    <template #edge-button="buttonEdgeProps">
      <EdgeWithButton
        :id="buttonEdgeProps.id"
        :source-x="buttonEdgeProps.sourceX"
        :source-y="buttonEdgeProps.sourceY"
        :target-x="buttonEdgeProps.targetX"
        :target-y="buttonEdgeProps.targetY"
        :source-position="buttonEdgeProps.sourcePosition"
        :target-position="buttonEdgeProps.targetPosition"
        :marker-end="buttonEdgeProps.markerEnd"
        :style="buttonEdgeProps.style"
      />
    </template>

    <Background />
    <MiniMap />
  </VueFlow>
</template>

