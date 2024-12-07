<script setup lang="ts">
import { useMainStore } from '../../stores';
import { computed } from 'vue';

const props = defineProps<{
  nodeId: string
}>();

const store = useMainStore()
const node = computed(() => {
  return store.nodes.find(node => node.id === props.nodeId)
})

</script>

<template>
  <div v-if="node">
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon style="color: #8b93d0" :icon="['far', 'comment-dots']" size="xl" />
      <h2 class="text-2xl font-bold">Add Comment</h2>
    </div>
    <div class="border-b pb-2">
      <span>
        Remark for more explanation.
      </span>
    </div>

    <div class="mt-4">
      {{ node.data.comment }}
    </div>

  </div>
</template>
