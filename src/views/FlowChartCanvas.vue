<script setup lang="ts">
import { ref, computed } from 'vue';

import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';

import EdgeWithButton from '../components/EdgeWithButton.vue';
import TriggerNode from '../components/nodes/TriggerNode.vue';
import SendMessageNode from '../components/nodes/SendMessageNode.vue';

const createNodes = (nodesArray) =>
  nodesArray.map((node) => ({
    ...node,
    data: {
      ...node.data,
      name: node.name 
    },
  }));

const initialNodes = computed(() => 
  createNodes([
    {
      id: '1',
      type: 'trigger',
      data: { 
        type: 'conversationOpened',
        oncePerContact: false,
      },
      position: { x: 250, y: 0 },
      class: 'light',
    },
    {
      name: 'Away Message',
      id: '2',
      type: 'sendMessage',
      data: {
        payload: [{
          type: 'text',
          text: 'Sorry, we are currently away. We will respond as soon as possible.',
        }],
      },
      position: { x: 100, y: 200 },
      class: 'light',
    },
    {
      name: 'Welcome Message',
      id: '3',
      type: 'sendMessage',
      data: {
        payload: [{
          type: 'text',
          text: 'Sorry, we are currently away. We will respond as soon as possible.',
        }],
      },
      position: { x: 400, y: 200 },
      class: 'light',
    },
  ])
);

console.log(initialNodes.value)

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
]);
</script>

<template>
  <VueFlow :nodes="initialNodes" :edges="initialEdges" fit-view-on-init>
    <template #node-trigger="triggerNodeProps">
      <TriggerNode :id="triggerNodeProps.id" :data="triggerNodeProps.data" />
    </template>
    <template #node-sendMessage="sendMessageNodeProps">
      <SendMessageNode
        :id="sendMessageNodeProps.id"
        :data="sendMessageNodeProps.data"
      />
    </template>
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

