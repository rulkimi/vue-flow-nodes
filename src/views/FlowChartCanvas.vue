<script setup lang="ts">
import { ref, computed } from 'vue';

import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';

import BaseLayout from '../layouts/BaseLayout.vue';

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
        payload: [
          {
            type: 'text',
            text: 'Sorry, we are currently away. We will respond as soon as possible.',
          },
        ],
      },
      position: { x: 400, y: 500 },
      class: 'light',
    },
    {
      name: 'Welcome Message',
      id: '3',
      type: 'sendMessage',
      data: {
        payload: [
          {
            type: 'attachment',
            attachment: 'https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58',
          }
        ],
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

const showDrawer = ref(true)
const vueFlowKey = ref(0)

const week = ref([
  { day: 'Mon' },
  { day: 'Tue' },
  { day: 'Wed' },
  { day: 'Thu' },
  { day: 'Fri' },
  { day: 'Sat' },
  { day: 'Sun' },
])
</script>

<template>
  <BaseLayout>
    <template #canvas>
      <VueFlow :key="vueFlowKey" :nodes="initialNodes" :edges="initialEdges" fit-view-on-init>
        <template #node-trigger="triggerNodeProps">
          <TriggerNode :id="triggerNodeProps.id" :data="triggerNodeProps.data" />
        </template>
        <template #node-sendMessage="sendMessageNodeProps">
          <SendMessageNode :id="sendMessageNodeProps.id" :data="sendMessageNodeProps.data" />
        </template>
        <template #node-addComment="addCommentNodeProps">
          <AddCommentNode :id="addCommentNodeProps.id" :data="addCommentNodeProps.data" />
        </template>
        <template #node-dateTime="DateTimeNodeProps">
          <DateTimeNode :id="DateTimeNodeProps.id" :data="DateTimeNodeProps.data" />
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
    <template #drawer>
      <div class="flex items-center gap-2 mb-4">
        <font-awesome-icon style="color: #f9511e" :icon="['fas', 'calendar-days']" size="xl" />
        <h2 class="text-2xl font-bold">Business Hours</h2>
      </div>
      <div class="border-b pb-2">
        <span>
          Allows a branch to be created based on date & time conditions.
          Use it to set business hours or date range conditions.
        </span>
      </div>

      <div class="grid grid-cols-12 py-4">
        <div class="col-span-3 ml-6">
          <font-awesome-icon class="mr-1" :icon="['far', 'calendar']" />
          <span>Day</span>
        </div>
        <div class="col-span-9">
          <font-awesome-icon class="mr-1" :icon="['far', 'clock']" />
          <span>Time</span>
        </div>
      </div>

      <div class="flex flex-col gap-2 mb-12">
        <div
          v-for="item in week"
          :key="item.day"
          class="grid grid-cols-12"
        >
          <span class="col-span-1"></span>
          <span class="col-span-2 text-start font-bold">{{ item.day }}</span>
          <div class="col-span-3 flex items-center gap-4">
            <input class="border rounded-lg p-1 w-16 text-center" value="09:00" />
            <font-awesome-icon :icon="['far', 'clock']" />
          </div>
          <span class="col-span-1">to</span>
          <div class="col-span-3 flex items-center gap-4">
            <input class="border rounded-lg p-1 w-16 text-center" value="17:00" />
            <font-awesome-icon :icon="['far', 'clock']" />
          </div>
        </div>
      </div>

      <label>
        <p class="text-slate-500 mb-1">Time Zone</p>
        <select class="border rounded-lg p-1 w-full">
          <option disabled>Select Time Zone</option>
          <option value="UTC" selected>(GMT+00:00) UTC</option>
        </select>
      </label>
    </template>
  </BaseLayout>
</template>


