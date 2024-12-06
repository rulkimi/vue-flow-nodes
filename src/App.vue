<script setup lang="ts">
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
</script>

<template>
  <VueFlow fit-view-on-init>
    <Background />
    <MiniMap />
  </VueFlow>
</template>

