<script setup lang="ts">
import { useMainStore } from '../../stores';
import { computed, ref , watch} from 'vue';
import { Node } from '../../types';
import SendMessageDetails from '../../components/templates/SendMessageDetails.vue';

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
const payload = ref(JSON.parse(JSON.stringify(node?.value?.data.payload)));
const sendMessageKey = ref(0)

const update = () => {
  if (!node.value) return;
  store.editNode(node.value.id, {
    data: {
      ...node.value.data,
      name: messageTitle.value,
      payload: payload.value,
    },
  });
};

watch(() => props.nodeId, (newNodeId) => {
  store.setActiveNodeId(newNodeId);
  const newNode = store.nodes?.find((node: Node) => node.id === newNodeId);

  if (newNode) {
    messageTitle.value = newNode?.data?.name ?? '';
    payload.value = newNode?.data?.payload ?? {};
    sendMessageKey.value++
  }
});

</script>

<template>
  <div v-if="node">
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon style="color: #3baca1" :icon="['far', 'paper-plane']" size="xl" />
      <h2 class="text-2xl font-bold">{{ node.name }}</h2>
    </div>
    <div class="border-b pb-2">
      <span>
        Send a message, including text or attachment.
      </span>
    </div>

    <div class="mt-4">
      <SendMessageDetails :key="sendMessageKey" v-model:model-send-message-title="messageTitle" v-model:model-messages="payload" />
      <div class="text-end">
        <button
          class="mt-4 py-1 px-2 border border-blue-500/50 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          @click="update"
        >
          Save
        </button>
      </div>
    </div>

  </div>
</template>
