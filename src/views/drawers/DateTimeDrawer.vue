<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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

const description = ref(node?.value?.data.description);
const title = ref(node?.value?.data.name);
const dateTimeKey = ref(0);

const update = () => {
  if (!node.value) return;
  store.editNode(node.value.id, {
    data: {
      ...node.value.data,
      times: node.value.data.times,
      timezone: node.value.data.timezone,
      description: description.value,
      name: title.value
    },
  });
  toast.showToast({
    message: `<strong>Business Hours</strong> updated.`,
    icon: 'calendar-days',
    iconColor: '#f9511e'
  });
};

watch(
  () => props.nodeId,
  (newNodeId) => {
    store.setActiveNodeId(newNodeId);

    const newNode = store.nodes?.find((node: Node) => node.id === newNodeId);
    if (newNode) {
      title.value = newNode.data.name || '';
      description.value = newNode.data.description || store.getNodeDescription('dateTime');
      dateTimeKey.value++;
    }
  }
);
</script>

<template>
  <DrawerLayout
    v-if="node"
    color="#f9511e"
    icon="calendar-days"
    :title="node?.data.name"
    :description="node?.data.description"
  >
    <template #content>
      <DateTimeDetails
        :key="dateTimeKey"
        v-model:model-node="node"
        v-model:model-date-time-title="title"
        v-model:model-date-time-description="description"
      />
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