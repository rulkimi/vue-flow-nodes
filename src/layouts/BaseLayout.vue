<script setup lang="ts">
import { useMainStore } from '../stores';
import AlertToast from '../components/AlertToast.vue';

const store = useMainStore();
const toggleDrawer = () => {
  store.setIsDrawerOpen(!store.isDrawerOpen)
};
</script>

<template>
  <div class="relative flex w-full h-full">
    <div class="flex-grow">
      <slot name="canvas"></slot>
    </div>

    <div
      :class="[
        'bg-white fixed md:static top-0 bottom-0 right-0 p-4 pb-24 shadow-lg w-[400px] md:w-[500px] overflow-y-scroll transition-transform duration-300',
        store.isDrawerOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      ]"
    >
      <slot name="drawer"></slot>
    </div>

    <button
      class="fixed top-4 right-2 md:hidden border bg-white px-2 py-1 rounded-lg shadow-sm"
      @click="toggleDrawer"
    >
      {{ store.isDrawerOpen ? 'Close' : 'Open' }} Drawer
    </button>
  </div>

  <AlertToast />
</template>
