<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMainStore } from '../../stores';
import { useToastStore } from '../../stores/toastStore';
import { Node } from '../../types'

const props = defineProps<{
  nodeId: string
}>();

const store = useMainStore();
const toast = useToastStore();
store.setActiveNodeId(props.nodeId);

const node = computed(() => {
  if (!store.nodes) return;
  return store.nodes.find((node: Node) => node.id === props.nodeId)
});

const commentTitle = ref(node?.value?.data.name);
const commentText = ref(node?.value?.data.comment);

const update = () => {
  if (!node.value) return
  store.editNode(node.value.id, {
    data: {
      name: commentTitle.value,
      comment: commentText.value
    }
  })
  toast.showToast({
    message: `<strong>${commentTitle.value}</strong> updated.`,
    icon: 'comment-dots',
    iconColor: '#8b93d0'
  });
}

watch(
  () => props.nodeId,
  (newNodeId) => {
    store.setActiveNodeId(newNodeId);

    const newNode = store.nodes?.find((node: Node) => node.id === newNodeId);
    if (newNode) {
      commentTitle.value = newNode.data.name || '';
      commentText.value = newNode.data.comment || '';
    }
  }
);
</script>

<template>
  <div v-if="node">
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon style="color: #8b93d0" :icon="['far', 'comment-dots']" size="xl" />
      <h2 class="text-2xl font-bold">{{ node.data.name }}</h2>
    </div>

    <div class="border-b pb-2">
      <span>
        {{ node.data.description }}
      </span>
    </div>

    <div class="mt-4">
      <div class="flex flex-col gap-2">
        <label>
          <p class="text-slate-500 mb-1 font-semibold">Title<sup class="text-red-500">*</sup></p>
          <input
            v-model="commentTitle"
            id="add-comment-title"
            type="text"
            placeholder="E.g. Welcome Message"
            class="border rounded-lg px-2 py-1 w-full"
          >
        </label>
        <label>
          <p class="text-slate-500 mb-1 font-semibold">Comment<sup class="text-red-500">*</sup></p>
          <input
            v-model="commentText"
            id="add-comment-text"
            type="text"
            placeholder="E.g. Welcome Message"
            class="border rounded-lg px-2 py-1 w-full"
          >
        </label>
      </div>
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
