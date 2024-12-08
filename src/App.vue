<script setup lang="ts">
import { useMainStore } from './stores';
import { onBeforeMount } from 'vue';

const store = useMainStore();

onBeforeMount(async () => {
  try {
    const response = await fetch('/payload.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    };
    const data = await response.json();
    store.setNodes(data);
  } catch (error) {
    console.error('Error fetching the JSON file:', error);
  }
});
</script>

<template>
  <router-view></router-view>
</template>