<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../../stores';
import { useToastStore } from '../../stores/toastStore';
import { Node } from '../../types'

import DateTimeDetails from '../../components/templates/DateTimeDetails.vue';
import DrawerLayout from '../../layouts/DrawerLayout.vue';

const props = defineProps<{
  nodeId: string
}>();

const store = useMainStore();
const toast = useToastStore();

store.setActiveNodeId(props.nodeId);

const node = computed(() => {
  if (!store.nodes) return;
  return store.nodes.find((node: Node) => node.id === props.nodeId);
});

const update = () => {
  if (!node.value) return;
  store.editNode(node.value.id, {
    data: {
      ...node.value.data,
      times: node.value.data.times,
      timezone: node.value.data.timezone
    },
  });
  toast.showToast({
    message: `<strong>Business Hours</strong> updated.`,
    icon: 'calendar-days',
    iconColor: '#f9511e'
  });
};
</script>

<template>
  <DrawerLayout
    color="#f9511e"
    icon="calendar-days"
    title="Business Hours"
    :description="node?.data.description"
  >
    <template #content>
      <div class="grid grid-cols-12 py-4">
        <div class="col-span-3 ml-6">
          <font-awesome-icon class="mr-1" :icon="['far', 'calendar']" />
          <span>Day</span>
        </div>
        <div class="col-span-9">
          <font-awesome-icon class="mr-1" :icon="['far', 'clock']" />
          <span>Time</span>
        </div>
      </div>
      <DateTimeDetails v-model="node" />
      <div class="text-end">
        <button
          class="mt-4 py-1 px-2 border border-blue-500/50 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          @click="update"
        >
          Save
        </button>
      </div>
    </template>
  </DrawerLayout>
</template>