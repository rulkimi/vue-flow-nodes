<script setup lang="ts">
import { ref, computed } from 'vue';

import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';

import EdgeWithButton from '../components/EdgeWithButton.vue';
import TriggerNode from '../components/nodes/TriggerNode.vue';
import SendMessageNode from '../components/nodes/SendMessageNode.vue';
import AddCommentNode from '../components/nodes/AddCommentNode.vue';
import DateTimeNode from '../components/nodes/DateTimeNode.vue';

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
      name: 'Business Hours',
      id: '2',
      type: 'dateTime',
      data: {
        timezone: 'UTC',
        action: 'businessHours'
      },
      position: { x: 250, y: 200 },
      class: 'light',
    },
    {
      name: 'Away Message',
      id: '4',
      type: 'sendMessage',
      data: {
        payload: [{
          type: 'text',
          text: 'Sorry, we are currently away. We will respond as soon as possible.',
        }],
      },
      position: { x: 400, y: 500 },
      class: 'light',
    },
    {
      name: 'Welcome Message',
      id: '3',
      type: 'sendMessage',
      data: {
        payload: [{
          type: 'attachment',
          attachment: 'https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58',
        }],
      },
      position: { x: 100, y: 500 },
      class: 'light',
    },
    {
      id: '5',
      type: 'addComment',
      data: {
        comment: 'User message during off hours'
      },
      name: 'Add Comment #1',
      position: { x: 400, y: 750}
    }
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
    id: 'e2-3',
    type: 'button',
    source: '2',
    target: '3',
  },
  {
    id: 'e2-4',
    type: 'button',
    source: '2',
    target: '4',
  },
  {
    id: 'e4-5',
    type: 'button',
    source: '4',
    target: '5',
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
    <template #node-addComment="addCommentNodeProps">
      <AddCommentNode
        :id="addCommentNodeProps.id"
        :data="addCommentNodeProps.data"
      />
    </template>
    <template #node-dateTime="DateTimeNodeProps">
      <DateTimeNode
        :id="DateTimeNodeProps.id"
        :data="DateTimeNodeProps.data"
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

