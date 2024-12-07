<script setup lang="ts">
import { useMainStore } from '../../stores';
import { computed } from 'vue';

import { Node } from '../../types'

const props = defineProps<{
  nodeId: string
}>();

const store = useMainStore()
store.setActiveNode(props.nodeId)

const node = computed(() => {
  if (!store.nodes) return;
  return store.nodes.find((node: Node) => node.id === props.nodeId)
})

</script>

<template>
  <div v-if="node">
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon style="color: #8b93d0" :icon="['far', 'comment-dots']" size="xl" />
      <h2 class="text-2xl font-bold">{{ node.name }}</h2>
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
