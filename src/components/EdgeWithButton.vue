<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useVueFlow } from '@vue-flow/core';

const props = defineProps<{
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: string
  targetPosition: string
  markerEnd?: string
  style?: Record<string, unknown>
}>()

const path = computed(() => getSmoothStepPath(props))
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
        @click="console.log(id)"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>
  </EdgeLabelRenderer>
</template>
