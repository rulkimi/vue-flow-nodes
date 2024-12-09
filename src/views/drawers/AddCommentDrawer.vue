<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMainStore } from '../../stores';
import { useToastStore } from '../../stores/toastStore';
import { Node } from '../../types'
import AddCommentDetails from '../../components/templates/AddCommentDetails.vue';
import DrawerLayout from '../../layouts/DrawerLayout.vue';

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
const description = ref(node?.value?.data.description);
const addCommentKey = ref(0);

const update = () => {
  if (!node.value) return
  store.editNode(node.value.id, {
    data: {
      name: commentTitle.value,
      comment: commentText.value,
      description: description.value
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
      commentTitle.value = newNode.data.name;
      commentText.value = newNode.data.comment;
      description.value = newNode.data.description;
      addCommentKey.value++
    }
  }
);
</script>

<template>
  <DrawerLayout
    v-if="node"
    color="#8b93d0"
    :title="node.data.name"
    :description="node.data.description"
    icon="comment-dots"
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <AddCommentDetails
          :key="addCommentKey"
          v-model:model-comment-title="commentTitle"
          v-model:model-comment-text="commentText"
          v-model:model-comment-description="description"
        />
      </div>
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
