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
  return store.nodes.find((node: Node) => node.id === props.nodeId)
})

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
      <div
        v-for="item in node.data.payload"
      >
        <p class="mb-1">Message:</p>
        <div v-if="item.type === 'text'">{{ item.text }}</div>
        <div v-else-if="item.type === 'attachment'">
          <img :src="item.attachment" alt="">
        </div>
      </div>
    </div>

  </div>
</template>
