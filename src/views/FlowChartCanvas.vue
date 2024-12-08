<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '../stores';
import { useToastStore } from '../stores/toastStore';
import { Node, NodeData } from '../types'
import { convertCamelToKebab } from '../utils';

import { useVueFlow, DefaultEdge } from '@vue-flow/core';
import { NodeMouseEvent, VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';

import BaseLayout from '../layouts/BaseLayout.vue';

import EdgeWithButton from '../components/edges/EdgeWithButton.vue';
import CustomEdge from '../components/edges/CustomEdge.vue';
import TriggerNode from '../components/nodes/TriggerNode.vue';
import SendMessageNode from '../components/nodes/SendMessageNode.vue';
import AddCommentNode from '../components/nodes/AddCommentNode.vue';
import DateTimeNode from '../components/nodes/DateTimeNode.vue';
import DateTimeConnectorNode from '../components/nodes/DateTimeConnectorNode.vue';
import EmptyNode from '../components/nodes/EmptyNode.vue';
import EmptyEdge from '../components/edges/EmptyEdge.vue';

const router = useRouter();
const store = useMainStore();
const toast = useToastStore();
const { findEdge, updateNode, addNodes } = useVueFlow();

onMounted(() => {
  setTimeout(() => {
    store.nodes.forEach((node: Node) => {
      const hasOutgoingEdge = store.edges.some(
        (edge: DefaultEdge) => edge.source === node.id
      )
      if (!hasOutgoingEdge && node.type !== 'emptyNode') {
        const newNode = {
          id: generateRandomId(),
          type: 'emptyNode',
          data: {},
          position: { 
            x: node.position.x,
            y: node.position.y + 250
          },
          parentId: node.id
        }
        addNodes(newNode)
        store.addNode(newNode)
      } 
    })
  }, 50)
});

const addNewNode = () => {
  const edge = findEdge(store.activeEdgeId);
  if (!edge) return;
  const { sourceNode, targetNode } = edge;

  let data: NodeData = {};
  if (store.newNodeData.type === 'sendMessage') {
    data = {
      name: store.newNodeData.title,
      payload: store.newNodeData.messages,
      description: store.newNodeData.description ?? store.getNodeDescription(store.newNodeData.type)
    };
  } else if (store.newNodeData.type === 'addComment') {
    data = {
      name: store.newNodeData.title,
      comment: store.newNodeData.comment,
      description: store.newNodeData.description ?? store.getNodeDescription(store.newNodeData.type)
    };
  } else if (store.newNodeData.type === 'dateTime') {
    data = {
      action: store.newNodeData.action,
      name: store.newNodeData.title,
      times: store.newNodeData.times,
      timezone: store.newNodeData.timezone,
      description: store.newNodeData.description ?? store.getNodeDescription(store.newNodeData.type)
    };
  };

  const newNode = {
    id: generateRandomId(),
    data: data,
    name: store.newNodeData.title,
    type: store.newNodeData.type,
    position: { 
      x: targetNode.position.x,
      y: targetNode.position.y
    },
    parentId: sourceNode.id
  };

  console.log(newNode)
  
  addNodes(newNode);
  store.addNode(newNode);

  router.push({ 
    name: convertCamelToKebab(store.newNodeData.type),
    params: { nodeId: newNode.id }
  });

  toast.showToast({
    message: `<strong>${newNode.name}</strong> node added.`,
    icon: 'circle-check',
    iconColor: 'green'
  });

  const updatedTargetPosition = {
    x: targetNode.position.x,
    y: targetNode.position.y + 200
  };

  updateNode(targetNode.id, { position: updatedTargetPosition });
  store.editNode(targetNode.id, {
    position: updatedTargetPosition,
    parentId: newNode.id,
  });

  moveChildNodes(targetNode.id, 200);
};

const removeNode = () => {
  if (!store.activeNodeId) return;

  const nodeId = store.activeNodeId;

  const childNodes = store.nodes.filter(node => node.parentId === nodeId);

  const nodeToRemove = store.nodes.find(node => node.id === nodeId);
  const parentId = nodeToRemove?.parentId;

  moveChildNodes(nodeId, -200);

  childNodes.forEach(childNode => {
    store.editNode(childNode.id, { parentId });
  });

  store.removeNode(nodeId);
  store.setActiveNodeId(null);
  router.push({ name: 'flowchart' })
  toast.showToast({
    message: `<strong>${nodeToRemove?.name ?? ''}</strong> node deleted.`,
    icon: 'circle-check',
    iconColor: 'green'
  });
};

const onNodeClick = ({ node }: NodeMouseEvent) => {
  store.setActiveNodeId(node.id);

  if (node.type === 'dateTime') router.push({ name: 'date-time', params: { nodeId: node.id } });
  else if (node.type === 'sendMessage') router.push({ name: 'send-message', params: { nodeId: node.id } });
  else if (node.type === 'addComment') router.push({ name: 'add-comment', params: { nodeId: node.id } });
  else router.push({ name: 'flowchart' })
};

const moveChildNodes = (parentNodeId: string, yOffset: number) => {
  const childEdges = store.edges.filter((e: DefaultEdge) => e.source === parentNodeId);
  const childNodes = childEdges.map((e: DefaultEdge) => store.nodes.find((n: Node) => n.id === e.target));

  childNodes.forEach((childNode) => {
    if (childNode) {
      const newChildPosition = {
        x: childNode.position.x,
        y: childNode.position.y + yOffset
      };
      updateNode(childNode.id, { position: newChildPosition });
      store.editNode(childNode.id, { position: newChildPosition });

      moveChildNodes(childNode.id, yOffset);
    }
  });
};

const generateRandomId = () => {
  let id;
  do {
    id = Math.random().toString(16).slice(2, 8); 
  } while (store.nodeIds.includes(id)); 
  return id;
};
</script>

<template>
  <BaseLayout>
    <template #canvas>
      <VueFlow
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
        <template #node-emptyNode="EmptyNodeProps">
          <EmptyNode :id="EmptyNodeProps.id" />
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
        <template #edge-custom="customEdgeProps">
          <CustomEdge
            :id="customEdgeProps.id"
            :source-x="customEdgeProps.sourceX"
            :source-y="customEdgeProps.sourceY"
            :target-x="customEdgeProps.targetX"
            :target-y="customEdgeProps.targetY"
            :source-position="customEdgeProps.sourcePosition"
            :target-position="customEdgeProps.targetPosition"
            :marker-end="customEdgeProps.markerEnd"
            :style="customEdgeProps.style"
          />
        </template>
        <template #edge-empty="emptyEdgeProps">
          <EmptyEdge
            :id="emptyEdgeProps.id"
            :source-x="emptyEdgeProps.sourceX"
            :source-y="emptyEdgeProps.sourceY"
            :target-x="emptyEdgeProps.targetX"
            :target-y="emptyEdgeProps.targetY"
            :source-position="emptyEdgeProps.sourcePosition"
            :target-position="emptyEdgeProps.targetPosition"
            :marker-end="emptyEdgeProps.markerEnd"
            :style="emptyEdgeProps.style"
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
  <div class="fixed z-10 bottom-4 right-4 flex gap-2">
    <button
      v-if="store.activeNodeId"
      :class="store.isDrawerOpen ? 'md:block ' : 'hidden md:block'"
      class="bg-white border border-red-500/50 text-red-500 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all duration-300"
      @click="removeNode"
    >
      Delete Node
    </button>
    <button
      v-if="store.activeEdgeId"
      :class="store.isDrawerOpen ? 'md:block ' : 'hidden md:block'"
      class="bg-white border border-blue-500/50 text-blue-500 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
      @click="addNewNode"
    >
      <font-awesome-icon class="mr-2" :icon="['fas', 'plus']" /> Add Node
    </button>
  </div>
</template>


