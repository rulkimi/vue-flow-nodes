<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, EdgeLabelRenderer, getStraightPath, Position } from '@vue-flow/core';
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

const path = computed(() => getStraightPath(props));

const router = useRouter();
const store = useMainStore();
const onAddButtonClick = (edgeId: string) => {
  store.setActiveEdgeId(edgeId);
  router.push({ name: 'add-node', params: { edgeId } });
};
</script>

<template>
  <BaseEdge
    :id="id"
    :style="{
      ...style,
      stroke: '#808080 !important', 
      strokeWidth: 2.5,
      strokeDasharray: '5,5',
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
