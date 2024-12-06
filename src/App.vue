<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const addCount = () => {
  count.value++;
}
</script>

<template>
  <button class="py-1 px-2 rounded-sm bg-teal-500 text-white" @click="addCount">Add Count</button>
  <h1 class="text-3xl font-bold underline inline ml-2">
    Count: {{ count }}
  </h1>
</template>