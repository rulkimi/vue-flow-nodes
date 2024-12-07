<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, DefaultEdge, EdgeLabelRenderer, getSmoothStepPath, Position } from '@vue-flow/core';
import { useVueFlow } from '@vue-flow/core';
import { useMainStore } from '../../stores';
import { useRouter } from 'vue-router';

import { Node } from '../../types'

const props = defineProps<{
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
  style?: Record<string, unknown>
}>()

const path = computed(() => getSmoothStepPath(props))
const { findEdge, updateNode, addNodes } = useVueFlow()
const store = useMainStore()

const moveChildNodesRecursively = (parentNodeId: string, yOffset: number) => {
  const childEdges = store.edges.filter((e: DefaultEdge) => e.source === parentNodeId);

  // Map these edges to their respective child nodes
  const childNodes = childEdges.map((e: DefaultEdge) => store.nodes.find((n: Node) => n.id === e.target));

  childNodes.forEach((childNode: Node) => {
    if (childNode) {
      const newChildPosition = {
        x: childNode.position.x,
        y: childNode.position.y + yOffset
      };

      // Update the child's position
      updateNode(childNode.id, { position: newChildPosition });
      store.editNode(childNode.id, { position: newChildPosition });

      // Recursively move the child's children
      moveChildNodesRecursively(childNode.id, yOffset);
    }
  });
};

const generateRandomId = () => `testing-${Date.now()}-${Math.floor(Math.random() * 1000)}`;


const addNewNode = (edgeId: string) => {
  const edge = findEdge(edgeId);
  if (!edge) return;
  const { sourceNode, targetNode } = edge;

  const newNode = {
    id: generateRandomId(),
    data: {
      name: 'Testing',
      payload: [
        {
          type: 'text',
          text: 'testing testing'
        }
      ]
    },
    type: 'sendMessage',
    position: { 
      x: targetNode.position.x,
      y: targetNode.position.y
    },
    parentId: sourceNode.id
  };

  // Add the new node
  addNodes(newNode);
  store.addNode(newNode);

  console.log(store.nodes);

  // Update the target node's position
  const updatedTargetPosition = {
    x: targetNode.position.x,
    y: targetNode.position.y + 200
  };

  updateNode(targetNode.id, { position: updatedTargetPosition });
  store.editNode(targetNode.id, {
    position: updatedTargetPosition,
    parentId: newNode.id,
  });

  // Recursively move all the child nodes' positions
  moveChildNodesRecursively(targetNode.id, 200);

  const newEdges = store.generateEdges();
  console.log(newEdges);
};

const router = useRouter()
const onAddButtonClick = (edgeId: string) => {
  console.log('here')
  router.push({ name: 'create-node' })
}
</script>

<template>
  <BaseEdge
    :id="id"
    :style="{
      ...style,
      strokeWidth: 2.5
    }"
    :path="path[0]"
    :marker-end="markerEnd"
  />

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px, ${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <button
        class="text-xs text-gray-500 bg-white p-1 rounded-full border flex items-center justify-center border-gray-400"
        @click="onAddButtonClick(id)"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>
  </EdgeLabelRenderer>
</template>
