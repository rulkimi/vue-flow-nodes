<script setup lang="ts">
import { computed, ref , watch } from 'vue';
import { useMainStore } from '../../stores';
import { Node } from '../../types';
import { useToastStore } from '../../stores/toastStore';

import SendMessageDetails from '../../components/templates/SendMessageDetails.vue';
import DrawerLayout from '../../layouts/DrawerLayout.vue';

const props = defineProps<{
  nodeId: string;
}>();

const store = useMainStore();
store.setActiveNodeId(props.nodeId)

const node = computed(() => {
  if (!store.nodes) return;
  return store.nodes.find((node: Node) => node.id === props.nodeId);
});

const messageTitle = ref(node?.value?.data.name);
const description = ref(node?.value?.data.description);
const payload = ref((node?.value?.data.payload));
const sendMessageKey = ref(0);

const toast = useToastStore();

const update = () => {
  if (!node.value) return;
  store.editNode(node.value.id, {
    data: {
      ...node.value.data,
      name: messageTitle.value,
      payload: payload.value,
      description: description.value
    }
  });

  toast.showToast({ 
    message: `<strong>${messageTitle.value}</strong> updated.`, 
    icon: 'paper-plane',
    iconColor: '#3baca1'
  });
};

watch(() => props.nodeId, (newNodeId) => {
  store.setActiveNodeId(newNodeId);
  const newNode = store.nodes?.find((node: Node) => node.id === newNodeId);

  if (newNode) {
    messageTitle.value = newNode?.data?.name ?? '';
    payload.value = newNode.data.payload;
    description.value = newNode?.data?.description ?? '';
    sendMessageKey.value++;
  }
});
</script>

<template>
  <DrawerLayout
    v-if="node"
    color="#3baca1"
    icon="paper-plane"
    :title="node.data.name"
    :description="node.data.description"
  >
    <template #content>
      <SendMessageDetails
        :key="sendMessageKey"
        v-model:model-send-message-title="messageTitle"
        v-model:model-messages="payload" 
        v-model:model-description="description"
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
