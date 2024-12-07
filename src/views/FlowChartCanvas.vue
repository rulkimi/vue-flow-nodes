<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '../stores';

import { NodeMouseEvent, VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';

import BaseLayout from '../layouts/BaseLayout.vue';

import EdgeWithButton from '../components/EdgeWithButton.vue';
import TriggerNode from '../components/nodes/TriggerNode.vue';
import SendMessageNode from '../components/nodes/SendMessageNode.vue';
import AddCommentNode from '../components/nodes/AddCommentNode.vue';
import DateTimeNode from '../components/nodes/DateTimeNode.vue';
import DateTimeConnectorNode from '../components/nodes/DateTimeConnectorNode.vue';

const vueFlowKey = ref(0)
const store = useMainStore()

const router = useRouter()
const onNodeClick = ({ event, node }: NodeMouseEvent) => {
  console.log('Node clicked: ', node, event);

  store.setActiveNode(node.id)

  if (node.type === 'dateTime') router.push({ name: 'date-time', params: { nodeId: node.id } })
  else if (node.type === 'sendMessage') router.push({ name: 'send-message', params: { nodeId: node.id } })
  else if (node.type === 'addComment') router.push({ name: 'add-comment', params: { nodeId: node.id } })
  else router.push({ name: 'flowchart' })
}
</script>

<template>
  <BaseLayout>
    <template #canvas>
      <VueFlow
        :key="vueFlowKey"
        :nodes="store.nodes"
        :edges="store.edges"
        fit-view-on-init
        @node-click="onNodeClick"
      >
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
        <template #node-dateTimeConnector="DateTimeConnectorNodeProps">
          <DateTimeConnectorNode :id="DateTimeConnectorNodeProps.id" :data="DateTimeConnectorNodeProps.data" />
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
            :style="buttonEdgeProps.style as Record<string, unknown>"
          />
        </template>

        <Background />
        <MiniMap />
      </VueFlow>
    </template>
    <template #drawer>
      <router-view></router-view>
    </template>
  </BaseLayout>
</template>


