<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, Position } from '@vue-flow/core';
import { useVueFlow } from '@vue-flow/core';
import { useMainStore } from '../../stores';

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
const { findEdge, updateNode, addNodes, updateEdge } = useVueFlow()
const store = useMainStore()

const onAddButtonClick = (edgeId: string) => {
  const edge = findEdge(edgeId)
  if (!edge) return;
  const { sourceNode, targetNode } = edge;
  const newNode = {
    id: 'testing',
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
  }
  addNodes(newNode)
  store.addNode(newNode)
  console.log(store.nodes)
  updateNode(
    targetNode.id, 
    { 
      position: { 
        x: targetNode.position.x, 
        y: targetNode.position.y + 200
      },
    }
  )
  store.editNode(
    targetNode.id,
    { 
      position: { 
        x: targetNode.position.x, 
        y: targetNode.position.y + 200
      },
      parentId: newNode.id
    },
  )
  const newEdges = store.generateEdges()
  console.log(newEdges)
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
