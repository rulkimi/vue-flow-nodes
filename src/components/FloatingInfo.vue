<script setup lang="ts">
import { ref } from 'vue';

const showTips = ref(true);
</script>

<template>
  <transition name="appear" appear>
    <div v-if="showTips" class="bg-white fixed top-4 left-4 p-4 border border-gray-200 shadow-md rounded-xl z-10 max-w-sm w-72">
      <p class="text-lg font-semibold text-gray-700 mb-3 flex items-center justify-between">
        <div>
          <font-awesome-icon :icon="['fas', 'info-circle']" class="text-teal-500 mr-1" ize />
          Adding Node
        </div>
        <font-awesome-icon
          :icon="['fas', 'times']" class="text-slate-400 hover:scale-105 transition-transform duration-300 cursor-pointer"
          @click="showTips = false"
        />
      </p>
      <ul class="text-sm text-gray-600 space-y-2 leading-5">
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">1.</span>
          Click a button on the edge to add the node
        </li>
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">2.</span>
          Select a node type on the drawer at the right side
        </li>
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">3.</span>
          Enter the required details
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.appear-enter-active, .appear-leave-active {
  transition: all 0.3s ease-out;
}

.appear-leave-to, .appear-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
</style>