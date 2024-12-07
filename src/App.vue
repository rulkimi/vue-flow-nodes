<script setup lang="ts">
import { useMainStore } from './stores';
import { onMounted } from 'vue';

const store = useMainStore()

onMounted(async () => {
  try {
    // Replace 'example.json' with your file name
    const response = await fetch('/payload.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    store.setNodes(data)
  } catch (error) {
    console.error('Error fetching the JSON file:', error);
  }
});
</script>

<template>
  <router-view></router-view>
</template>