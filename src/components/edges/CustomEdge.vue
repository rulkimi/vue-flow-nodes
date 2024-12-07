<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, Position } from '@vue-flow/core';

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
</template>
