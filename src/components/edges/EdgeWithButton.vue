<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, Position } from '@vue-flow/core';
import { useMainStore } from '../../stores';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
  style?: any
}>()

const path = computed(() => getSmoothStepPath(props));

const router = useRouter();
const store = useMainStore();
const onAddButtonClick = (edgeId: string) => {
  store.setActiveEdgeId(edgeId)
  router.push({ name: 'add-node', params: { edgeId: edgeId } })
};
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
        :class="{ 'ring-2 ring-blue-500' : store.activeEdgeId === id }"
        class="text-xs text-gray-500 bg-white p-1 rounded-full border flex items-center justify-center border-gray-400 hover:scale-105 transition-all duration-300"
        @click="onAddButtonClick(id)"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>
  </EdgeLabelRenderer>
</template>
