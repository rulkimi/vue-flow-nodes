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
  <BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" />

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
        class="text-xs text-gray-500 bg-white w-4 h-4 rounded-full border flex items-center justify-center border-gray-400"
        @click="console.log(id)"
      >
        +
      </button>
    </div>
  </EdgeLabelRenderer>
</template>
